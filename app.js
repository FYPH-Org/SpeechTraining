const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
mongoose.Promise = global.Promise;

// mongoose.connect()

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

// wire up routes from routes.js

app.get('/test', (req, res) => {
  res.json({ msg: 'online' });
});

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
