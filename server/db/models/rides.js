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
  }],
  expireAt: {
        type: Date,
        required: true
  },
  email: {
    type: String
  }
});

// Expire at the time indicated by the expireAt field
rideSchema.index({ expireAt: 1 }, { expireAfterSeconds : 0 });

const Ride = module.exports = mongoose.model('Ride', rideSchema);
