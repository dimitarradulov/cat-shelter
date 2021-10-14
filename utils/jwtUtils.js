const jwt = require('jsonwebtoken');
const util = require('util');

const sign = (payload, secret) => {
  const promise = new Promise((resolve, reject) => {
    jwt.sign(payload, secret, function (err, token) {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });

  return promise;
};

const verify = util.promisify(jwt.verify);

const jwtUtils = {
  sign,
  verify,
};

module.exports = jwtUtils;
