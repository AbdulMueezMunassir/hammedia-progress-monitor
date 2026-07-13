const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');

router.get('/', protect, (req, res) => {
  res.json({ success: true, message: 'User routes working' });
});

router.get('/workers', protect, admin, (req, res) => {
  res.json({ success: true, message: 'Workers list' });
});

module.exports = router;