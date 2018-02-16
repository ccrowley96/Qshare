const express = require('express');
const ObjectId = require('mongodb').ObjectID;
const router = express.Router();

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
    ride.origin = req.body.origin.toLowerCase();
    ride.destination = req.body.destination.toLowerCase();
    ride.date = req.body.date;



    if (req.body.description) {
      ride.description = req.body.description;
    }

    ride.save((err) => {
      if (err) {
        console.log(err);
        res.send("Data Deposit Error A");
      }
      else {
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
    ride.origin = req.body.origin.toLowerCase();
    ride.destination = req.body.destination.toLowerCase();
    ride.date = req.body.date;

    if (req.body.description) {
      ride.description = req.body.description;
    }

    Ride.update({"_id": ObjectId(`${rideID}`)}, ride, (err) => {
      if (err) {
        console.log(err);
        res.send("Data Update Error");
      }
      else {
        res.redirect('/');
      }
    });
});

//Query Ride by ID
router.get('/:id', (req, res, next) => {
  const ride_id = req.params.id;
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

module.exports = router;
