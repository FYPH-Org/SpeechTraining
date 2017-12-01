const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
mongoose.Promise = global.Promise;

const corsOptions = {
  "origin": "http://localhost:3000",
  "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
  "preflightContinue": true,
  "optionsSuccessStatus": 204,
  "credentials": true // enable set cookie
};

const app = express();

// static server
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));


mongoose.Promise = global.Promise;
const connect = mongoose.connect(
    'mongodb://localhost/User',
    { useMongoClient: true }
);

connect.then(() => {
    const { routes } = require('./api/routes/routes');
    routes(app);
    app.listen(process.env.PORT);
    console.log(`Server listening on port ${process.env.PORT}`);
}, (err) => {
    console.log('\n**********************');
    console.log("ERROR: Failed to connect to MongoDB.");
    console.log('\n**********************');
});
