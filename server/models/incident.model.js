const { Schema, model } = require('mongoose');

const incidentSchema = new Schema(
  {
    project: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
      unique: true,
      index: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['open', 'researching', 'identified', 'closed'],
      default: 'open',
      index: true,
    },
    trace: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Incident = model('Incident', incidentSchema);

module.exports = Incident;
