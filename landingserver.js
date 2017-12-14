const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const logger = console;

const corsOptions = {
  'origin': 'http://localhost:3000',
  'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
  'preflightContinue': true,
  'optionsSuccessStatus': 204,
  'credentials': true // enable set cookie
};

const app = express();

// static server
app.use(express.static(path.join(__dirname, 'client/landingpage')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));


app.listen(process.env.PORT || 3003, () => {
  if (process.env.PORT) {
    logger.log(`server running on port ${process.env.PORT}`);
  } else {
    logger.log('server running on port 3003');
  }

});
