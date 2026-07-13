const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');

router.get('/', protect, (req, res) => {
  res.json({ success: true, message: 'Attendance routes working' });
});

module.exports = router;