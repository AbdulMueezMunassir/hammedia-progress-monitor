const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');

// Import controllers (with fallback)
let dashboardController;
try {
  dashboardController = require('../controllers/dashboardController');
  console.log('✅ Dashboard controller loaded successfully');
} catch (error) {
  console.error('❌ Error loading dashboard controller:', error.message);
  // Create fallback controller
  dashboardController = {
    getDashboardStats: (req, res) => {
      res.json({ 
        success: true, 
        message: 'Dashboard stats (fallback)',
        data: {
          totalWorkers: 1,
          activeTasks: 0,
          completedTasks: 0,
          completionRate: 0
        }
      });
    },
    getRecentActivity: (req, res) => {
      res.json({ 
        success: true, 
        message: 'Recent activity (fallback)',
        data: []
      });
    },
    getCompleteDashboard: (req, res) => {
      res.json({ 
        success: true, 
        message: 'Complete dashboard (fallback)',
        data: {
          summary: {
            totalWorkers: 1,
            totalTasks: 0,
            completedTasks: 0,
            completionRate: 0
          },
          recentActivity: [
            { type: 'system', title: 'Welcome to Hammedia', user: 'System', time: new Date() }
          ],
          meetings: []
        }
      });
    },
    getWeeklyDashboard: (req, res) => {
      res.json({ 
        success: true, 
        message: 'Weekly dashboard (fallback)',
        data: {
          week: 1,
          year: 2024,
          summary: {
            totalTasks: 0,
            completedTasks: 0
          }
        }
      });
    }
  };
}

// Dashboard routes
router.get('/test', protect, admin, (req, res) => {
  res.json({ 
    success: true, 
    message: 'Dashboard routes are working!',
    user: req.user?.name || 'Unknown',
    timestamp: new Date().toISOString()
  });
});

router.get('/stats', protect, admin, dashboardController.getDashboardStats);
router.get('/activity', protect, admin, dashboardController.getRecentActivity);
router.get('/complete', protect, admin, dashboardController.getCompleteDashboard);
router.get('/weekly', protect, admin, dashboardController.getWeeklyDashboard);

// Simple test route without authentication (for testing)
router.get('/public-test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Public dashboard test route is working!',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;