const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const router = express.Router();
const Rides = require('./rides');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
/*--------------------------Connect to DB ------------------------------ */
// //Live DB connection 35.203.114.77
// const host = "35.203.114.77";
// const name = "qshare";
// const port = 27017;
// mongoose.connect(`mongodb://qshare-client:qshare-2018@${host}:${port}/${name}`);
//mongodb://username:password@localhost:27012/damongoose.connect('mongodb://localhost/qshare');
const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const dbname = process.env.DB_NAME;
const port = 27017;

/* Connect to remote mongo instance only if username & password specified */
if(!username || !password){
  mongoose.connect(`mongodb://${host}:${port}/${dbname}`);
} else {
  mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${dbname}`);
}
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
