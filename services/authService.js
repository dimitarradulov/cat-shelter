const User = require('../models/User');
const bcrypt = require('bcrypt');
const constants = require('../constants');
const jwtUtils = require('../utils/jwtUtils');

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

const createToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };

  return jwtUtils.sign(payload, constants.SECRET_KEY);
};

const authService = {
  register,
  login,
  createToken,
};

module.exports = authService;
