const mongoose = require('mongoose');

const host = 'LocalDB';
const name = 'QshareDB';
const port = 27017;

const url = `mongodb://${host}:${port}/${name}`;
const opt = {useMongoClient: true};
