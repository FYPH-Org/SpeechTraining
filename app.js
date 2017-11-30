const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
mongoose.Promise = global.Promise;


// mongoose stuff
const User = require('./api/userModel.js');
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


app.post('/dbtest', (req, res) => {
  const { Username, email, analysis } = req.body;
  if (!Username) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Missing required Username' });
    return;
  }
  if (!analysis) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Missing required analysis' });
    return;
  }
  if (!email) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Missing email' });
    return;
  }
  const newUser = new User({ Username, email, analysis });
  newUser.save((err) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: 'error' });
      return;
    }
    res.json(newUser);
  });
});
// basic post request

// app.listen(process.env.PORT, () => {
//   console.log(`server running on port ${process.env.PORT}`);
// });
// commented out for mongoose stuff
mongoose.Promise = global.Promise;
const connect = mongoose.connect(
    'mongodb://localhost/User',
    { useMongoClient: true }
);

connect.then(() => {
    app.listen(process.env.PORT);
    console.log(`Server listening on port ${process.env.PORT}`);
}, (err) => {
    console.log('\n**********************');
    console.log("ERROR: Failed to connect to MongoDB.");
    console.log('\n**********************');
});
