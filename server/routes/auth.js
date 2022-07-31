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

router.route('/refresh-token').get((req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token' });
  }

  tokenManager.refreshToken(refreshToken, (err, email) => {
    if (err) {
      return res.status(401).json({ error: err });
    }

    const accessToken = tokenManager.generateAccessToken({ email });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
    });
    res.sendStatus(200);
  });
});

router.route('/logout').post((req, res) => {
  const refreshToken = req.body.refreshToken;

  tokenManager.revokeRefreshToken(refreshToken);

  res.sendStatus(200);
});

module.exports = router;
