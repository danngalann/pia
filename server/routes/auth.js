const router = require('express').Router();

const TokenManager = require('../auth/TokenManager');
const User = require('../models/user.model');

const tokenManager = new TokenManager();

router.route('/login').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(500).json('Error: ' + err);
      return;
    }

    if (!user) {
      res.status(400).json('Invalid email or password');
      return;
    }

    user.validatePassword(password, (err, isValid) => {
      if (err) {
        res.status(400).json('Error: ' + err);
        return;
      }

      if (!isValid) {
        res.status(400).json('Invalid email or password');
        return;
      }

      if (isValid) {
        const refreshToken = tokenManager.generateRefreshToken({ email });
        const accessToken = tokenManager.generateAccessToken({ email });

        user.refreshTokens.push(refreshToken);

        user
          .save()
          .then(() => {
            res.cookie('accessToken', accessToken, {
              httpOnly: true,
            });
            res.cookie('refreshToken', refreshToken, {
              httpOnly: true,
            });
            res.sendStatus(200);
          })
          .catch(err => res.status(400).json(err.message));
      }
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
