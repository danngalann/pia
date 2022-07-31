const router = require('express').Router();
const authenticationMiddleware = require('../auth/authenticationMiddleware');
const Incident = require('../models/incident.model');

router.route('/').get(authenticationMiddleware, (req, res) => {
  Incident.find()
    .then(incidents => res.json(incidents))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Incident.findById(req.params.id)
    .then(incident => res.json(incident))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/update/status').patch((req, res) => {
  Incident.findById(req.params.id)
    .then(incident => {
      incident.status = req.body.status;

      incident
        .save()
        .then(() => res.json(incident))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const project = req.body.project;
  const message = req.body.message;
  const trace = req.body.trace;

  const newIncident = new Incident({ project, message, trace });

  newIncident
    .save()
    .then(() => res.json(newIncident))
    .catch(err => res.status(400).json(err.message));
});

module.exports = router;
