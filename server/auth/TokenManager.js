const jwt = require('jsonwebtoken');

class TokenManager {
  constructor() {
    // TODO Move this to redis or something.
    // Users will get logged out on every server restart otherwise.
    this.refreshTokens = [];
  }

  generateAccessToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '5m' });
  }

  generateRefreshToken(data) {
    const refreshToken = jwt.sign(data, process.env.JWT_SECRET);
    refreshTokens.push(refreshToken);
    return refreshToken;
  }

  refreshToken(refreshToken, callback) {
    // Check if token is present on refreshTokens array
    if (refreshTokens.indexOf(refreshToken) === -1) {
      return callback('Invalid refresh token');
    }

    // Verify token and return decrypted data
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, email) => {
      if (err) {
        return callback(err);
      }
      callback(null, email);
    });
  }

  revokeRefreshToken(refreshToken) {
    const index = refreshTokens.indexOf(refreshToken);
    if (index !== -1) {
      refreshTokens.splice(index, 1);
    }
  }
}

module.exports = TokenManager;
