const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = (username, password, repeatPassword) => {
  // return bcrypt
  //   .hash(password, 9)
  //   .then((hash) => User.create({ username, password: hash }));

  return User.create({ username, password });
};

const login = async (username, password) => {
  try {
    const user = await User.findOne({ username });

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      return user;
    } else {
      throw { message: 'Cannot find username or password' };
    }
  } catch {
    return null;
  }
};

const authService = {
  register,
  login,
};

module.exports = authService;
