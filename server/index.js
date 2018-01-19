const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const API = require('./api/api');
const port = 3000;
const BUNDLE_DIR = path.join(__dirname, '../'); // Path to static files

//Init App
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//API Endpoint Router
app.use('/api', API);
// Static Files
app.use(express.static(BUNDLE_DIR));

//Start Listening
app.listen(port, () => console.log(`Qshare running on port: ${port}!`));
