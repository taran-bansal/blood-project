const mongoose = require('mongoose');

const emergencyRequestSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  unitsNeeded: {
    type: Number,
    required: true,
    min: 1
  },
  hospital: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  contactName: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
  },
  urgencyLevel: {
    type: String,
    required: true,
    enum: ['urgent', 'critical', 'immediate']
  },
  additionalInfo: String,
  status: {
    type: String,
    enum: ['active', 'fulfilled', 'expired'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  fulfilledBy: [{
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donor'
    },
    units: Number,
    donatedAt: Date
  }]
});

// Index for searching and sorting
emergencyRequestSchema.index({ bloodGroup: 1, location: 1, status: 1 });

module.exports = mongoose.model('EmergencyRequest', emergencyRequestSchema); 