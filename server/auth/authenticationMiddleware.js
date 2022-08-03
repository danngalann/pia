const jwt = require('jsonwebtoken');

function authenticationMiddleware(req, res, next) {
  const token = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!token) {
    return refreshToken
      ? res.status(403).json({
          error: 'No access token was found, but refresh token provided. Do you need to refresh the access token?',
        })
      : res.status(401).json({ error: 'No token provided' });
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
