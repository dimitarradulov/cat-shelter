const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

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

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 9).then((hash) => {
    this.password = hash;

    next();
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
