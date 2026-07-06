const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');

router.get('/stats', protect, admin, (req, res) => {
  res.json({
    totalWorkers: 24,
    activeTasks: 18,
    completedTasks: 42,
    pendingTasks: 15,
    completionRate: 78,
    totalMeetings: 15,
    upcomingMeetings: 5,
    attendanceRate: 85
  });
});

module.exports = router;