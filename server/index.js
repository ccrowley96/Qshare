const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const frameguard = require('frameguard');
const cors = require('cors');
const API = require('./api/index');
const sgMail = require('@sendgrid/mail');
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
//Default catch all -> to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
//Start Listening
app.listen(port, () => {
    console.log(`Qshare server running on port: ${port}!`);
    console.log(`Qshare client running on port: 8080!`);
  }
);


`// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'ccrowley96@gmail.com',
//   from: 'dev@qshare.ca',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);`
