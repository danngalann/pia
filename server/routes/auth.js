const router = require('express').Router();

const TokenManager = require('../auth/TokenManager');
const User = require('../models/user.model');

const tokenManager = new TokenManager();

router.route('/login').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    user.validatePassword(password, (err, isMatch) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const accessToken = tokenManager.generateAccessToken({ email });
      const refreshToken = tokenManager.generateRefreshToken({ email });

      res.json({ accessToken, refreshToken });
    });
  });
});

router.route('/refresh').post((req, res) => {
  const refreshToken = req.body.refreshToken;

  tokenManager.refreshToken(refreshToken, (err, email) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const accessToken = tokenManager.generateAccessToken({ email });

    res.json({ accessToken });
  });
});

router.route('/logout').post((req, res) => {
  const refreshToken = req.body.refreshToken;

  tokenManager.revokeRefreshToken(refreshToken);

  res.sendStatus(200);
});

module.exports = router;