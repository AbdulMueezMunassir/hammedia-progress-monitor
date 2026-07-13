const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');

router.get('/', protect, (req, res) => {
  res.json({ success: true, message: 'Meeting routes working' });
});

router.post('/', protect, admin, (req, res) => {
  res.json({ success: true, message: 'Meeting created' });
});

module.exports = router;