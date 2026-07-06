const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');

router.get('/', protect, admin, (req, res) => {
  res.json({ 
    success: true, 
    message: 'Reports list',
    data: [] 
  });
});

module.exports = router;