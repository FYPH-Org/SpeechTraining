const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  analysis: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('User', UserSchema);