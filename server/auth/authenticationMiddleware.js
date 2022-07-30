const jwt = require('jsonwebtoken');

function authenticationMiddleware(req, res, next) {
  const token = req.headers['x-access-token'];
  if (token == null) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticationMiddleware;
