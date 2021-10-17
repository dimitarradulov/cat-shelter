const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    validate: [
      /[a-zA-Z0-9]+/i,
      'Username should consist of english latters and digits only!',
    ],
    unique: true,
    minlength: [5, 'Less than 5 characters long'],
  },
  password: {
    type: String,
    required: true,
    validate: [
      /[a-zA-Z0-9]+/i,
      'Password should consist of english latters and digits only!',
    ],
    minlength: [8, 'Less than 8 characters long'],
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
