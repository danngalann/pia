const { Schema, model } = require('mongoose');

const traceSchema = new Schema({
  file: {
    type: String,
    required: true,
  },
  line: {
    type: Number,
    required: true,
  },
  function: {
    type: String,
    required: false,
  },
  args: {
    type: Array,
    required: false,
  },
});

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
      type: [traceSchema],
      required: true,
    },
  },
  { timestamps: true }
);

const Incident = model('Incident', incidentSchema);

module.exports = Incident;
