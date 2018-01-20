const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const router = express.Router();
const Rides = require('./rides');

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
//API welcome Message
router.get('/', (req, res, next) => {
  res.send('Welcome to the Qshare API');
});
//API Rides Routing
router.use('/rides', Rides);
module.exports = router;
