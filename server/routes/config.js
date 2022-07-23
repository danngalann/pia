const router = require('express').Router();
const User = require('../models/user.model');

router.route('/setup-required').get((req, res) => {
  User.countDocuments()
    .then(count => {
      if (count === 0) {
        res.json(true);
      } else {
        res.json(false);
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
