const express = require('express');
const path = require('path');

// Path to static files
const BUNDLE_DIR = path.join(__dirname, '../');

const app = express();
const port = 3000;

// Static Files
app.use(express.static(BUNDLE_DIR));

//Start Listening
app.listen(port, () => console.log(`Qshare running on port: ${port}!`));
