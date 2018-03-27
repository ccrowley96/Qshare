const express = require('express');
const ObjectId = require('mongodb').ObjectID;
const moment = require('moment');
const path = require('path');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const fs = require('fs');

//Set up SENDGRID api key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Bring in Rides Model
const Ride = require('../db/models/rides');

/* ------------------------- RIDE CRUD API --------------------------*/
//GET All Rides
router.get('/', (req, res, next) => {
  Ride.find({}, (err, rides) => {
      if (err) {
        console.log("/api ride find error");
        console.log(err);
        res.send("Data Retrieve Error A");
      } else {
      res.json({
        title: 'Rides',
        rides
      });
    }
    });
});
//POST single Ride
router.post('/', (req, res, next) => {
    const ride = new Ride();
    ride.uid = req.body.uid;
    ride.link = req.body.link;
    ride.profile_picture = req.body.profile_picture;
    ride.name = req.body.name.toLowerCase();
    ride.price = req.body.price;
    ride.capacity = req.body.capacity;
    ride.origin = req.body.origin;
    ride.destination = req.body.destination;
    ride.date = req.body.date;
    if(req.body.email){
      ride.email = req.body.email;
    }
    const expireTime = moment(req.body.date).add(12, "hours").toISOString();
    ride.expireAt = expireTime;

    if (req.body.description) {
      ride.description = req.body.description;
    }

    ride.save((err,savedRide) => {
      if (err) {
        console.log(err);
        res.send("Data Deposit Error A");
      }
      else {
        if(req.body.email){
          //Send Ride Created Email
          fs.readFile(path.resolve(__dirname, '../emails/ride-created.html'), 'utf8', function(err, data) {
              if (err) throw err;
              const emailHTML = data;
              const msg = {
                to: `${req.body.email}`,
                substitutionWrappers: ['{{','}}'],
                substitutions: {
                  name:`${req.body.name.substr(0, req.body.name.indexOf(" "))}`,
                  origin:`${req.body.origin}`,
                  destination:`${req.body.destination}`,
                  date:`${moment(req.body.date).format('dddd, MMMM Do hh:mm A')}`,
                  price:`${req.body.price}`,
                  capacity:`${req.body.capacity}`,
                  expire_time: `${moment(ride.expireAt).format('dddd, MMMM Do hh:mm A')}`,
                  rideID:`${savedRide.id}`
                },
                from: 'rides@qshare.ca',
                subject: 'Your QShare Ride is Live!',
                text: 'Safe. Reliable. Eco-Friendly',
                html: emailHTML
              };
              sgMail.send(msg);
          });
        }
        res.redirect('/');
      }
    });
});
//UPDATE single Ride
router.post('/update', (req, res, next) => {
    const ride = {};
    const rideID = req.body.rideID;

    ride.uid = req.body.uid;
    ride.link = req.body.link;
    ride.name = req.body.name.toLowerCase();
    ride.price = req.body.price;
    ride.capacity = req.body.capacity;
    ride.origin = req.body.origin;
    ride.destination = req.body.destination;
    ride.date = req.body.date;
    const expireTime = moment(req.body.date).add(12, "hours").toISOString();
    ride.expireAt = expireTime;

    if (req.body.description) {
      ride.description = req.body.description;
    }

    Ride.update({"_id": ObjectId(`${rideID}`)}, ride, (err, updatedRide) => {
      if (err) {
        console.log(err);
        res.send("Data Update Error");
      }
      else {
        res.redirect('/');
      }
    });
});

//JOIN single Ride
router.post('/join', (req, res, next) => {
  //Check Capacity
  Ride.findOne({"_id": ObjectId(`${req.body.rideID}`) }, (err, ride) =>{
    if (err) {
      console.log(err);
      throw err;
    } else {
      if(ride){
        let isAlreadyPassenger = false;
        ride.passengers.map((passenger)=>{
          if(passenger.uid == req.body.uid){
            isAlreadyPassenger = true;
          }
        });

        if(ride.capacity > 0 && !isAlreadyPassenger){
          //Join Ride if capacity is available
          Ride.update({"_id": ObjectId(`${req.body.rideID}`)}, {'$push': {"passengers":{
            uid: req.body.uid,
            name: req.body.name,
            fblink: req.body.link
          }}}, (err) => {
            if (err) {
              console.log(err);
              res.send("Ride Join DB Error");
            }
            else {
              //Decrement capacity
              Ride.update({"_id" : ObjectId(`${req.body.rideID}`)}, { '$inc': { "capacity": -1 } }, (err) => {
                if(err){
                  console.log(err);
                }
              });
              //Send passenger joined email
              if(ride.email){
                //Send Passenger Joined Email
                fs.readFile(path.resolve(__dirname, '../emails/passenger-joined.html'), 'utf8', function(err, data) {
                    if (err) throw err;
                    const emailHTML = data;
                    const msg = {
                      to: `${ride.email}`,
                      substitutionWrappers: ['{{','}}'],
                      substitutions: {
                        name:`${capFirst(ride.name.substr(0, req.body.name.indexOf(" ")))}`,
                        passenger_name: `${req.body.name}`,
                        passenger_fb_link: `${req.body.link}`,
                        destination:`${ride.destination}`,
                        capacity:`${ride.capacity - 1}`,
                        rideID:`${ride.id}`
                      },
                      from: 'rides@qshare.ca',
                      subject: `${req.body.name} has joined your ride!`,
                      text: 'Safe. Reliable. Eco-Friendly',
                      html: emailHTML
                    };
                    sgMail.send(msg);
                });
              }
              //redirect home
              res.redirect('/');
            }
          });
        } else{
          res.redirect('/');
        }
      } else {
        res.redirect('/');
      }
    }
  });
});

//LEAVE single Ride
router.post('/leave', (req, res, next) => {

  Ride.findOne({"_id": ObjectId(`${req.body.rideID}`) }, (err, ride) =>{
    if (err) {
      console.log(err);
      throw err;
    } else {

      let isAlreadyPassenger = false;
      ride.passengers.map((passenger)=>{
        if(passenger.uid == req.body.uid){
          isAlreadyPassenger = true;
        }
      });
      if(isAlreadyPassenger){
        Ride.update({"_id": ObjectId(`${req.body.rideID}`)}, {'$pull': {"passengers":{"uid": req.body.uid}}}, (err) => {
          if (err) {
            console.log(err);
            res.send("Ride Join DB Error");
          }
          else {
            //Decrement capacity
            Ride.update({"_id" : ObjectId(`${req.body.rideID}`)}, { '$inc': { "capacity": 1 } }, (err) => {
              if(err){
                console.log(err);
              }
            });
            res.redirect('/');
          }
        });
      } else{
        res.redirect('/');
      }
    }
  });
});


//Query Ride by ID
router.get('/:id', (req, res, next) => {
  console.log(req.params);
  const ride_id = req.params.id;
  //ride_id must be 24 characters to qualify in mongoose find
  if(ride_id.length == 24){
    Ride.find({"_id": ObjectId(`${ride_id}`) }, (err, ride) =>{
      if (err) {
        console.log(err);
        throw err;
      } else {
        res.json({
          title: 'Ride',
          ride
        });
      }
    });
  } else {
    res.json({
      title: 'Ride',
      ride: []
    });
  }
});

//Query Ride by User ID
router.get('/user/:id', (req, res, next) => {
  const user_id = req.params.id;
  Ride.find({"uid": `${user_id}`}, (err, rides) =>{
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.json({
        title: 'Ride',
        rides
      });
    }
  });
});

//Query Ride by passenger ID
router.get('/passenger/:id', (req, res, next) => {
  const passenger_id = req.params.id;
  //db.users.find({awards: {$elemMatch: {award:'National Medal', year:1975}}})
  Ride.find({passengers: {$elemMatch: {uid:`${passenger_id}`}}}, (err, rides) =>{
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.json({
        title: 'Ride',
        rides
      });
    }
  });
});

//Delete Ride by ID
router.delete('/:id', (req, res, next) => {
  const ID = req.params.id;
  Ride.deleteOne({"_id": ObjectId(`${ID}`) }, (err, rides) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.send(`Ride with ID: ${ID} Deleted!`);
    }
  });
});

function capFirst(input) {
    var output = '';
    for (var i = 0; i < input.length; i++) {
      if (i === 0) {
        output = input.charAt(0).toUpperCase() + input.slice(i + 1);
      }
      if ((i + 1) <= input.length && input.charAt(i) === ' ') {
       output = output.substring(0, i + 1) + input.charAt(i + 1).toUpperCase() + input.slice(i + 2);
      }
    }
    return output;
}

module.exports = router;
