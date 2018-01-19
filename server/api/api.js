const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();

//Connect to DB
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
//Get Ride
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
//Post Ride
router.post('/rides', (req, res, next) => {
    const ride = new Ride();
    ride.name = req.body.name;
    ride.price = req.body.price;
    ride.capacity = req.body.capacity;
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

module.exports = router;
