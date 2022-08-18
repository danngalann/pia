const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

class TokenManager {
  generateAccessToken(userEmail) {
    return jwt.sign(userEmail, process.env.JWT_SECRET, { expiresIn: '10m' });
  }

  generateRefreshToken(userEmail) {
    const refreshToken = jwt.sign(userEmail, process.env.JWT_SECRET);
    return refreshToken;
  }

  refreshToken(refreshToken, callback) {
    // Check if token is present on refreshTokens array
    this._getPersistedRefreshTokens().then(refreshTokens => {
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
    });
  }

  revokeRefreshToken(refreshToken) {
    // TODO Implement this
  }

  async _getPersistedRefreshTokens() {
    const users = await User.find().exec();
    return users.map(user => user.refreshTokens).flat();
  }
}

module.exports = TokenManager;
