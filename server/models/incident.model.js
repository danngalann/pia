const { Schema, model } = require('mongoose');

const incidentSchema = new Schema(
  {
    project: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
      index: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['open', 'investigating', 'identified', 'closed'],
      default: 'open',
      index: true,
    },
    trace: {
      type: Array,
      required: true,
    },
    trace_hash: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Incident = model('Incident', incidentSchema);

module.exports = Incident;
