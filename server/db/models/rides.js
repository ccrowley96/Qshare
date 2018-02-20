const mongoose = require('mongoose');

// Article Schema
const rideSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true
  },
  link: {
    type: String
  },
  profile_picture: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  passengers: [{
    uid : String,
    name : String,
    fblink: String
   }]
});

const Ride = module.exports = mongoose.model('Ride', rideSchema);
