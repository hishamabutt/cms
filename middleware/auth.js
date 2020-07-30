const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: 'No Token, Authorization Denied' }] });
  }

  try {
    const decode = jwt.verify(token, config.get('jwtSecret'));
    req.admin = decode.admin;
    next();
  } catch (err) {
    res.status(401).send('Token is not valid');
  }
};
