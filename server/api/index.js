const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const router = express.Router();

/*--------------------------Connect to DB ------------------------------ */
mongoose.connect('mongodb://localhost/qshare');
const db = mongoose.connection;
//Check connection
db.once('open', () =>{
  console.log('Connected to MongoDB');
});
//Check for DB errors
db.on('error', () => {
  console.log("Database Error!");
  console.log(err);
});

//Body Parser Middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//Bring in Rides Model
const Ride = require('../db/models/rides');

router.get('/', (req, res, next) => {
  res.send('Qshare API');
});
/* -------------------------- REST API ------------------------ */
//GET All Rides
router.get('/rides', (req, res, next) => {
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
router.post('/rides', (req, res, next) => {
    const ride = new Ride();
    ride.name = req.body.name.toLowerCase();
    ride.price = req.body.price;
    ride.capacity = req.body.capacity;

    ride.save((err) => {
      if (err) {
        console.log(err);
        res.send("Data Deposit Error A");
      }
      else {
        console.log(`Ride Created: name: ${ride.name}, price: ${ride.price}, capacity: ${ride.capacity}`);
        res.redirect('/');
      }
    });
});

//Query Ride by name
router.get('/rides/:name', (req, res, next) => {
  const ride_name = req.params.name;
  console.log(ride_name);
  Ride.find({name: ride_name}, (err, rides) =>{
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.json({
        title: 'Rides',
        rides
      });
    }
  });

});

//Delete Ride by ID
router.delete('/rides/:id', (req, res, next) => {
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
