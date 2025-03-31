const express = require('express');
const router = express.Router();
const BloodBank = require('../models/bloodBank.model');
const auth = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/auth.middleware');

// Get all blood banks
router.get('/', async (req, res) => {
  try {
    const bloodBanks = await BloodBank.find();
    res.json(bloodBanks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get blood bank by ID
router.get('/:id', async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(req.params.id);
    if (!bloodBank) {
      return res.status(404).json({ message: 'Blood bank not found' });
    }
    res.json(bloodBank);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create blood bank (admin only)
router.post('/', [auth, isAdmin], async (req, res) => {
  try {
    const bloodBank = new BloodBank(req.body);
    await bloodBank.save();
    res.status(201).json(bloodBank);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update blood bank (admin only)
router.put('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const bloodBank = await BloodBank.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!bloodBank) {
      return res.status(404).json({ message: 'Blood bank not found' });
    }
    res.json(bloodBank);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update blood bank inventory
router.put('/:id/inventory', auth, async (req, res) => {
  try {
    const { bloodGroup, units } = req.body;
    const bloodBank = await BloodBank.findById(req.params.id);
    
    if (!bloodBank) {
      return res.status(404).json({ message: 'Blood bank not found' });
    }

    const inventoryItem = bloodBank.inventory.find(item => item.bloodGroup === bloodGroup);
    if (inventoryItem) {
      inventoryItem.units = units;
      inventoryItem.lastUpdated = new Date();
    } else {
      bloodBank.inventory.push({
        bloodGroup,
        units,
        lastUpdated: new Date(),
      });
    }

    await bloodBank.save();
    res.json(bloodBank);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete blood bank (admin only)
router.delete('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(req.params.id);
    if (!bloodBank) {
      return res.status(404).json({ message: 'Blood bank not found' });
    }
    await bloodBank.remove();
    res.json({ message: 'Blood bank removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 