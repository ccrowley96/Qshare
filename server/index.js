const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const BUNDLE_DIR = path.join(__dirname, '../'); // Path to static files

//Connect to DB
mongoose.connect('mongodb://localhost/qshare');
const db = mongoose.connection;
//Check connection
db.once('open', () =>{
  console.log('Connected to MongoDB');
});

//Check for DB erros
db.on('error', () => {
  console.log("Database Error!");
  console.log(err);
});

//Init App
const app = express();

//Bring in Rides
const Ride = require('./db/models/rides');
const router = express.Router();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Prevent CORS issues
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 next();
});

// Core API
app.get('/api/rides', (req, res, next) =>{
  Ride.find({}, (err, rides) => {
    if (err) {
      console.log("/api ride find error");
      console.log(err);
    } else {
    res.json({
      title: 'Rides',
      rides
    });
  }
  });
 //res.send(`API Initialized!`);
});

app.post('/api/rides', (req, res, next) => {
  console.log(req.body);
  const ride = new Ride();
  ride.name = req.body.name;
  ride.price = req.body.price;
  ride.capacity = req.body.capacity;

  ride.save((err) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/');
    }
  });
});

// Static Files
app.use(express.static(BUNDLE_DIR));

//Start Listening
app.listen(port, () => console.log(`Qshare running on port: ${port}!`));
