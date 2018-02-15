const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const frameguard = require('frameguard');
const cors = require('cors');
const API = require('./api/index');
const BUNDLE_DIR = path.join(__dirname, '../'); // Path to static files

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const port = process.env.PORT;

// Init App
const app = express();

// Enable Cross Origin Requests with CORS
app.use(cors({credentials: true, origin: true}));

// Allow from a specific host:
app.use(frameguard({
  action: 'allow-from',
  domain: 'http://facebook.com'
}));

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// HTTPS Redirect for production
if (process.env.FORCE_SSL) {
    app.enable('trust proxy');
    app.use((req, res, next) => {
        if (req.secure) {
            next();
        } else {
            res.redirect('https://' + req.headers.host + req.url);
        }
    });
}


//API Endpoint Router
app.use('/api', API);
// Static Files
app.use(express.static(BUNDLE_DIR));
//Start Listening
app.listen(port, () => {
    console.log(`Qshare server running on port: ${port}!`);
    console.log(`Qshare client running on port: 8080!`);
  }
);
