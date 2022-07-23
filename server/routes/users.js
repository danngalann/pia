const router = require('express').Router();
const User = require('../models/user.model');

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
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json(err.message));
  });
});

module.exports = router;
