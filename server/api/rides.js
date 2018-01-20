const express = require('express');
const ObjectId = require('mongodb').ObjectID;
const router = express.Router();

//Bring in Rides Model
const Ride = require('../db/models/rides');

/* ------------------------- RIDE CRUD API --------------------------*/
//GET All Rides
router.get('/', (req, res, next) => {
  console.log('Routing Worked!');
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

//Query Ride by name
router.get('/:name', (req, res, next) => {
  const ride_name = req.params.name;
  console.log(`Query for name: ${ride_name}`);
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
