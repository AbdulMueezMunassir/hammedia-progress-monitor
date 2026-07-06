const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.get('/', protect, (req, res) => {
  res.json({ 
    success: true, 
    message: 'Notifications list',
    data: [] 
  });
});

module.exports = router;