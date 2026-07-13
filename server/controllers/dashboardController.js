// Simple dashboard controller without complex dependencies
const User = require('../models/User');
const Task = require('../models/Task');
const Meeting = require('../models/Meeting');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    // Get counts from MongoDB
    const totalWorkers = await User.countDocuments({ role: 'worker', isActive: true });
    const totalTasks = await Task.countDocuments({});
    const completedTasks = await Task.countDocuments({ status: 'completed' });
    const activeTasks = await Task.countDocuments({ 
      status: { $in: ['pending', 'in-progress'] } 
    });
    
    const completionRate = totalTasks > 0 
      ? Math.round((completedTasks / totalTasks) * 100) 
      : 0;

    res.json({
      success: true,
      data: {
        totalWorkers: totalWorkers || 0,
        activeTasks: activeTasks || 0,
        completedTasks: completedTasks || 0,
        pendingTasks: activeTasks || 0,
        completionRate: completionRate || 0,
        totalMeetings: await Meeting.countDocuments({}) || 0,
        upcomingMeetings: await Meeting.countDocuments({ status: 'upcoming' }) || 0
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Get recent activity
exports.getRecentActivity = async (req, res) => {
  try {
    const recentTasks = await Task.find({})
      .sort({ updatedAt: -1 })
      .limit(10)
      .populate('assignedTo', 'name');

    const activities = recentTasks.map(task => ({
      type: 'task',
      title: task.title || 'Untitled Task',
      action: `${task.status || 'pending'} task`,
      user: task.assignedTo?.name || 'Unknown',
      time: task.updatedAt || task.createdAt || new Date(),
      status: task.status || 'pending',
      progress: task.progress || 0
    }));

    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('Recent activity error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Get complete dashboard data
exports.getCompleteDashboard = async (req, res) => {
  try {
    const user = req.user;
    
    // Get counts
    const totalWorkers = await User.countDocuments({ role: 'worker', isActive: true });
    const tasks = await Task.find({});
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Get meetings
    const meetings = await Meeting.find({})
      .populate('organizer', 'name')
      .sort({ date: -1 })
      .limit(10);

    // Get recent activity
    const recentTasks = await Task.find({})
      .sort({ updatedAt: -1 })
      .limit(10)
      .populate('assignedTo', 'name');

    const activities = recentTasks.map(task => ({
      type: 'task',
      title: task.title || 'Untitled Task',
      action: `${task.status || 'pending'} task`,
      user: task.assignedTo?.name || 'Unknown',
      time: task.updatedAt || task.createdAt || new Date(),
      status: task.status || 'pending',
      progress: task.progress || 0
    }));

    // Prepare weekly trend data (last 6 weeks)
    const weeklyTrend = [];
    for (let i = 5; i >= 0; i--) {
      const weekDate = new Date();
      weekDate.setDate(weekDate.getDate() - (i * 7));
      const weekNum = getWeekNumber(weekDate);
      
      const weekTasks = tasks.filter(t => {
        const taskDate = new Date(t.createdAt || t.updatedAt);
        return getWeekNumber(taskDate) === weekNum;
      });
      
      weeklyTrend.push({
        week: `W${weekNum}`,
        total: weekTasks.length,
        completed: weekTasks.filter(t => t.status === 'completed').length,
        inProgress: weekTasks.filter(t => t.status === 'in-progress').length
      });
    }

    // Department data (default)
    const departments = [
      { id: '1', name: 'Management', code: 'MGT', color: '#3B82F6' },
      { id: '2', name: 'Design', code: 'DES', color: '#8B5CF6' },
      { id: '3', name: 'Development', code: 'DEV', color: '#10B981' },
      { id: '4', name: 'Marketing', code: 'MKT', color: '#F59E0B' },
      { id: '5', name: 'HR', code: 'HR', color: '#EF4444' }
    ];

    const departmentBoards = departments.map(dept => ({
      department: dept,
      stats: {
        total: 0,
        completed: 0,
        completionRate: 0
      },
      items: []
    }));

    res.json({
      success: true,
      data: {
        summary: {
          totalWorkers: totalWorkers || 0,
          totalTasks: totalTasks || 0,
          completedTasks: completedTasks || 0,
          inProgressTasks: inProgressTasks || 0,
          pendingTasks: pendingTasks || 0,
          completionRate: completionRate || 0,
          totalMeetings: meetings.length || 0,
          upcomingMeetings: meetings.filter(m => m.status === 'upcoming').length || 0,
          attendanceRate: 0,
          presentCount: 0,
          absentCount: 0,
          lateCount: 0
        },
        charts: {
          weeklyTrend: weeklyTrend,
          attendance: {
            present: 0,
            absent: 0,
            late: 0
          },
          workerPerformance: []
        },
        departments: departmentBoards,
        actionItems: {
          total: 0,
          escalated: [],
          byStatus: {
            'not-started': 0,
            'on-going': 0,
            'stuck': 0,
            'hold': 0,
            'complete': 0,
            'dropped': 0
          }
        },
        recentActivity: activities,
        meetings: meetings.map(m => ({
          id: m._id,
          title: m.title || 'Meeting',
          type: m.type || 'F3',
          date: m.date || new Date(),
          startTime: m.startTime || '10:00',
          status: m.status || 'upcoming',
          organizer: m.organizer?.name || 'Admin'
        })),
        currentWeek: {
          week: getWeekNumber(new Date()),
          year: new Date().getFullYear()
        }
      }
    });
  } catch (error) {
    console.error('Complete dashboard error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Get weekly dashboard
exports.getWeeklyDashboard = async (req, res) => {
  try {
    const currentWeek = getWeekNumber(new Date());
    const currentYear = new Date().getFullYear();

    const meetings = await Meeting.find({
      week: `${currentYear}-W${String(currentWeek).padStart(2, '0')}`
    });

    res.json({
      success: true,
      data: {
        week: currentWeek,
        year: currentYear,
        meetings: meetings.map(m => ({
          id: m._id,
          title: m.title,
          date: m.date,
          status: m.status
        })),
        summary: {
          totalMeetings: meetings.length
        }
      }
    });
  } catch (error) {
    console.error('Weekly dashboard error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Helper function
function getWeekNumber(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}