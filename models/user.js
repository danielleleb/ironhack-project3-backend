
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  type: {
    type: String,
    default: 'user'
  },
  address: {
    city: {
      type: String,
      required: false
    }
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
