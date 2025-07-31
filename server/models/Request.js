const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bloodType: {
    type: String,
    required: true
  },
  units: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  reason: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
