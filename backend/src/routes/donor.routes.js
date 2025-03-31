const express = require('express');
const router = express.Router();
const Donor = require('../models/donor.model');
const auth = require('../middleware/auth.middleware');

// Get all donors
router.get('/', async (req, res) => {
  try {
    const donors = await Donor.find().populate('user', 'name email');
    res.json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get donor by ID
router.get('/:id', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id).populate('user', 'name email');
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.json(donor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create donor profile
router.post('/', auth, async (req, res) => {
  try {
    const { bloodGroup, age, location, phone, medicalConditions } = req.body;

    const donor = new Donor({
      user: req.user.userId,
      bloodGroup,
      age,
      location,
      phone,
      medicalConditions,
    });

    await donor.save();
    res.status(201).json(donor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update donor profile
router.put('/:id', auth, async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    if (donor.user.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedDonor = await Donor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedDonor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete donor profile
router.delete('/:id', auth, async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    if (donor.user.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await donor.remove();
    res.json({ message: 'Donor profile removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 