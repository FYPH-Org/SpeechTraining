const User = require('../models/userModel');

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

const register = (req, res) => {
  const { username } = req.body;
  if (!username) return sendUserError('Please provide a username', res);
  const newUser = new User({ username, analysis: 'not yet implemented' });
  newUser.save((err) => {
    if (err) return sendUserError(err, res);
    res.json({ saved: true });
  });
};

module.exports = { register };
