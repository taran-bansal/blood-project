const mongoose = require('mongoose');

const bloodBankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  operatingHours: {
    open: String,
    close: String
  },
  inventory: [{
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    units: {
      type: Number,
      default: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  }],
  services: [{
    type: String
  }],
  isOpen24x7: {
    type: Boolean,
    default: false
  },
  emergencyContact: {
    name: String,
    phone: String
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for searching and sorting
bloodBankSchema.index({ location: 1, name: 1 });

module.exports = mongoose.model('BloodBank', bloodBankSchema); 