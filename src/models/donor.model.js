const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  lastDonation: {
    type: Date
  },
  medicalConditions: {
    type: String
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  donationCount: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donor', donorSchema); 