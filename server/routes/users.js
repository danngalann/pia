const router = require('express').Router();

const TokenManager = require('../auth/TokenManager');
const User = require('../models/user.model');

const tokenManager = new TokenManager();

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  User.countDocuments().then(count => {
    const email = req.body.email;
    const password = req.body.password;
    const isAdmin = count === 0;

    const newUser = new User({ email, password, isAdmin });

    newUser
      .save()
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => res.status(400).json(err.message));
  });
});

module.exports = router;
