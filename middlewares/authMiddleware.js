const constants = require('../constants');
const jwtUtils = require('../utils/jwtUtils');

const auth = (req, res, next) => {
  const token = req.cookies[constants.APP_TOKEN];

  if (!token) {
    return next();
  }

  jwtUtils
    .verify(token, constants.SECRET_KEY)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch(() => {
      return res.status(401).redirect('/login');
    });
};

const isAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).redirect('/login');
  }

  next();
};

const authMiddleware = {
  auth,
  isAuth,
};

module.exports = authMiddleware;
