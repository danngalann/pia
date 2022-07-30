const router = require('express').Router();
const jwt = require('jsonwebtoken');
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
      .then(() => {
        // If the user is the first one, log them in as an admin
        if (isAdmin) {
          const accessToken = jwt.sign({ email }, process.env.JWT_SECRET);

          res.json({ accessToken });
        }
      })
      .catch(err => res.status(400).json(err.message));
  });
});

module.exports = router;
