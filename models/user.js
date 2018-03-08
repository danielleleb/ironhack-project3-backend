
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  businessName: {
    type: String,
    required: false
  },
  username: String,
  password: String,
  type: {
    type: String,
    default: 'user'
  },
  description: {
    type: String,
    required: false
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
