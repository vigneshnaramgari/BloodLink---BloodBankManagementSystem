const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  bloodType: {
    type: String,
    required: true,
    unique: true
  },
  units: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
