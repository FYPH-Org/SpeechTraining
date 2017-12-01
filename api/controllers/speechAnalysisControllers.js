const User = require('../models/userModel');
const dotenv = require('dotenv');

const SERVER_USER_ERROR = 422;

// helper function to send errors
const sendUserError = (err, res) => {
  res.status(SERVER_USER_ERROR);
  if (typeof err === 'string') {
    res.json({ err });
    return;
  } else if (err && err.message) {
    res.json({
      message: err.message,
      stack: err.stack,
    });
    return;
  }
  res.json(err);
};

// test route
const test = (req, res) => {
  res.json({ msg: 'online' });
};


// app.post('/dbtest', (req, res) => {
//   const { Username, email, analysis } = req.body;
//   if (!Username) {
//     res.status(STATUS_USER_ERROR);
//     res.json({ error: 'Missing required Username' });
//     return;
//   }
//   if (!analysis) {
//     res.status(STATUS_USER_ERROR);
//     res.json({ error: 'Missing required analysis' });
//     return;
//   }
//   if (!email) {
//     res.status(STATUS_USER_ERROR);
//     res.json({ error: 'Missing email' });
//     return;
//   }
//   const newUser = new User({ Username, email, analysis });
//   newUser.save((err) => {
//     if (err) {
//       res.status(STATUS_SERVER_ERROR);
//       res.json({ error: 'error' });
//       return;
//     }
//     res.json(newUser);
//   });
// });

module.exports = {
  test,
};
