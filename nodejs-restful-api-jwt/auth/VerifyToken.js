const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyToken = (req, res, next) => {
  var token = req.headers['x-access-token'];
  if (!token) {
    res.status(403).send({ auth: false, message: 'No token provided.' });
    return;
  }
    
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      return;
    }
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;