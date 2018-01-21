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

//Query Ride by ID
router.get('/:id', (req, res, next) => {
  const ride_id = req.params.id;
  console.log(`Query for id: ${ride_id}`);
  Ride.find({"_id": ObjectId(`${ride_id}`) }, (err, ride) =>{
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(ride);
      res.json({
        title: 'Ride',
        ride
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
