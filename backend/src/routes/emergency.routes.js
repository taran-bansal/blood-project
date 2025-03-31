const express = require('express');
const router = express.Router();
const Emergency = require('../models/emergency.model');
const auth = require('../middleware/auth.middleware');

// Get all emergency requests
router.get('/', async (req, res) => {
  try {
    const emergencies = await Emergency.find()
      .sort({ createdAt: -1 })
      .populate('fulfilledBy.donor', 'name bloodGroup');
    res.json(emergencies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get emergency request by ID
router.get('/:id', async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id)
      .populate('fulfilledBy.donor', 'name bloodGroup');
    if (!emergency) {
      return res.status(404).json({ message: 'Emergency request not found' });
    }
    res.json(emergency);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create emergency request
router.post('/', auth, async (req, res) => {
  try {
    const {
      patientName,
      bloodGroup,
      unitsNeeded,
      hospital,
      location,
      contactName,
      contactPhone,
      urgencyLevel,
      additionalInfo,
    } = req.body;

    const emergency = new Emergency({
      patientName,
      bloodGroup,
      unitsNeeded,
      hospital,
      location,
      contactName,
      contactPhone,
      urgencyLevel,
      additionalInfo,
    });

    await emergency.save();
    res.status(201).json(emergency);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update emergency request
router.put('/:id', auth, async (req, res) => {
  try {
    const emergency = await Emergency.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!emergency) {
      return res.status(404).json({ message: 'Emergency request not found' });
    }
    res.json(emergency);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add donor to emergency request
router.post('/:id/donors', auth, async (req, res) => {
  try {
    const { units } = req.body;
    const emergency = await Emergency.findById(req.params.id);
    
    if (!emergency) {
      return res.status(404).json({ message: 'Emergency request not found' });
    }

    emergency.fulfilledBy.push({
      donor: req.user.userId,
      units,
      donatedAt: new Date(),
    });

    const totalUnitsFulfilled = emergency.fulfilledBy.reduce((sum, donation) => sum + donation.units, 0);
    if (totalUnitsFulfilled >= emergency.unitsNeeded) {
      emergency.status = 'fulfilled';
    }

    await emergency.save();
    res.json(emergency);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 