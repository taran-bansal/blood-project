const express = require('express');
const EmergencyRequest = require('../models/emergency.model');
const { auth } = require('../middleware/auth.middleware');

const router = express.Router();

// Create emergency request
router.post('/', auth, async (req, res) => {
  try {
    const request = new EmergencyRequest({
      ...req.body,
      createdBy: req.user._id
    });
    
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all emergency requests with filters
router.get('/', async (req, res) => {
  try {
    const { bloodGroup, location, status, urgencyLevel } = req.query;
    const query = {};
    
    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (location) query.location = new RegExp(location, 'i');
    if (status) query.status = status;
    if (urgencyLevel) query.urgencyLevel = urgencyLevel;
    
    const requests = await EmergencyRequest.find(query)
      .populate('createdBy', 'name')
      .populate('fulfilledBy.donor', 'name')
      .sort('-createdAt');
      
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get emergency request by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await EmergencyRequest.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('fulfilledBy.donor', 'name');
      
    if (!request) {
      return res.status(404).json({ message: 'Emergency request not found' });
    }
    
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update emergency request
router.put('/:id', auth, async (req, res) => {
  try {
    const request = await EmergencyRequest.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found or unauthorized' });
    }
    
    Object.assign(request, req.body);
    await request.save();
    
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Fulfill emergency request (donor response)
router.post('/:id/fulfill', auth, async (req, res) => {
  try {
    const request = await EmergencyRequest.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ message: 'Emergency request not found' });
    }
    
    if (request.status !== 'active') {
      return res.status(400).json({ message: 'Request is no longer active' });
    }
    
    const { units } = req.body;
    
    request.fulfilledBy.push({
      donor: req.user._id,
      units,
      donatedAt: new Date()
    });
    
    // Check if request is completely fulfilled
    const totalUnitsFulfilled = request.fulfilledBy.reduce((sum, donation) => sum + donation.units, 0);
    if (totalUnitsFulfilled >= request.unitsNeeded) {
      request.status = 'fulfilled';
    }
    
    await request.save();
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark request as expired
router.patch('/:id/expire', auth, async (req, res) => {
  try {
    const request = await EmergencyRequest.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found or unauthorized' });
    }
    
    if (request.status !== 'active') {
      return res.status(400).json({ message: 'Request is not active' });
    }
    
    request.status = 'expired';
    await request.save();
    
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 