const mongoose = require('mongoose');

// Article Schema
const rideSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  }
});

const Ride = module.exports = mongoose.model('Ride', rideSchema);
