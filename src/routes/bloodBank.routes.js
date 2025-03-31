const express = require('express');
const BloodBank = require('../models/bloodBank.model');
const { auth, isAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

// Create blood bank (admin only)
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const bloodBank = new BloodBank(req.body);
    await bloodBank.save();
    res.status(201).json(bloodBank);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all blood banks with filters
router.get('/', async (req, res) => {
  try {
    const { location, name, isOpen24x7 } = req.query;
    const query = {};
    
    if (location) query.location = new RegExp(location, 'i');
    if (name) query.name = new RegExp(name, 'i');
    if (isOpen24x7 !== undefined) query.isOpen24x7 = isOpen24x7 === 'true';
    
    const bloodBanks = await BloodBank.find(query)
      .sort('location name');
      
    res.json(bloodBanks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
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
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update blood bank (admin only)
router.put('/:id', auth, isAdmin, async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(req.params.id);
    
    if (!bloodBank) {
      return res.status(404).json({ message: 'Blood bank not found' });
    }
    
    Object.assign(bloodBank, req.body);
    bloodBank.updatedAt = new Date();
    await bloodBank.save();
    
    res.json(bloodBank);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update inventory
router.patch('/:id/inventory', auth, isAdmin, async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(req.params.id);
    
    if (!bloodBank) {
      return res.status(404).json({ message: 'Blood bank not found' });
    }
    
    const { bloodGroup, units } = req.body;
    const inventoryItem = bloodBank.inventory.find(item => item.bloodGroup === bloodGroup);
    
    if (inventoryItem) {
      inventoryItem.units = units;
      inventoryItem.lastUpdated = new Date();
    } else {
      bloodBank.inventory.push({
        bloodGroup,
        units,
        lastUpdated: new Date()
      });
    }
    
    bloodBank.updatedAt = new Date();
    await bloodBank.save();
    
    res.json(bloodBank);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Search blood banks by blood group availability
router.get('/search/availability', async (req, res) => {
  try {
    const { bloodGroup, minUnits = 1 } = req.query;
    
    if (!bloodGroup) {
      return res.status(400).json({ message: 'Blood group is required' });
    }
    
    const bloodBanks = await BloodBank.find({
      'inventory': {
        $elemMatch: {
          bloodGroup,
          units: { $gte: parseInt(minUnits) }
        }
      }
    }).sort('location name');
    
    res.json(bloodBanks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get nearby blood banks
router.get('/search/nearby', async (req, res) => {
  try {
    const { latitude, longitude, maxDistance = 10 } = req.query; // maxDistance in kilometers
    
    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }
    
    const bloodBanks = await BloodBank.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance) * 1000 // Convert to meters
        }
      }
    });
    
    res.json(bloodBanks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 