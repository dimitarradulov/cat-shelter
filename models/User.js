const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [2, 'Less than 2 characters'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Less than 6 characters'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
