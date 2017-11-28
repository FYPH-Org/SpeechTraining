const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

// wire up routes from routes.js

app.get('/test', (req, res) => {
  res.json({ msg: 'online' });
});

app.listen(process.env.PORT || 3030, () => {
  console.log('server running on port 3030');
});
