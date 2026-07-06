const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');

// Get all workers (admin only)
router.get('/workers', protect, admin, (req, res) => {
  res.json({ 
    success: true, 
    message: 'Workers list',
    data: [] 
  });
});

module.exports = router;