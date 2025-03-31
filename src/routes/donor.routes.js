const express = require('express');
const Donor = require('../models/donor.model');
const { auth } = require('../middleware/auth.middleware');

const router = express.Router();

// Create donor profile
router.post('/', auth, async (req, res) => {
  try {
    const donorData = {
      ...req.body,
      user: req.user._id
    };
    
    const donor = new Donor(donorData);
    await donor.save();
    
    res.status(201).json(donor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all donors with filters
router.get('/', async (req, res) => {
  try {
    const { bloodGroup, location, isAvailable } = req.query;
    const query = {};
    
    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (location) query.location = new RegExp(location, 'i');
    if (isAvailable !== undefined) query.isAvailable = isAvailable === 'true';
    
    const donors = await Donor.find(query)
      .populate('user', 'name email')
      .sort('-updatedAt');
      
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get donor by ID
router.get('/:id', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id)
      .populate('user', 'name email');
      
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    
    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update donor profile
router.put('/:id', auth, async (req, res) => {
  try {
    const donor = await Donor.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found or unauthorized' });
    }
    
    Object.assign(donor, req.body);
    await donor.save();
    
    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update donation count
router.patch('/:id/donate', auth, async (req, res) => {
  try {
    const donor = await Donor.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found or unauthorized' });
    }
    
    donor.donationCount += 1;
    donor.lastDonation = new Date();
    await donor.save();
    
    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Toggle availability
router.patch('/:id/toggle-availability', auth, async (req, res) => {
  try {
    const donor = await Donor.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found or unauthorized' });
    }
    
    donor.isAvailable = !donor.isAvailable;
    await donor.save();
    
    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 