import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { 
  FaTasks, 
  FaCheckCircle, 
  FaClock, 
  FaCalendarAlt,
  FaChartLine,
  FaExclamationTriangle,
  FaUserCircle
} from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import Loader from '../../components/common/Loader';

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    assignedTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    pendingTasks: 0,
    upcomingMeetings: 0,
    completionRate: 0
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);

  useEffect(() => {
    // Load from localStorage or simulate
    const savedTasks = localStorage.getItem('workerTasks');
    const savedMeetings = localStorage.getItem('workerMeetings');
    
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      setRecentTasks(tasks.slice(0, 4));
      const completed = tasks.filter(t => t.status === 'completed').length;
      const inProgress = tasks.filter(t => t.status === 'in-progress').length;
      const pending = tasks.filter(t => t.status === 'pending').length;
      setStats({
        assignedTasks: tasks.length,
        completedTasks: completed,
        inProgressTasks: inProgress,
        pendingTasks: pending,
        upcomingMeetings: 2,
        completionRate: tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0
      });
    } else {
      // Sample data
      const sampleTasks = [
        { id: 1, title: 'Complete dashboard UI', status: 'in-progress', deadline: '2024-07-25', progress: 75 },
        { id: 2, title: 'Backend API Integration', status: 'pending', deadline: '2024-07-30', progress: 0 },
        { id: 3, title: 'Testing & Bug Fixes', status: 'completed', deadline: '2024-07-20', progress: 100 },
        { id: 4, title: 'Documentation', status: 'in-progress', deadline: '2024-07-28', progress: 40 }
      ];
      setRecentTasks(sampleTasks);
      localStorage.setItem('workerTasks', JSON.stringify(sampleTasks));
      setStats({
        assignedTasks: 4,
        completedTasks: 1,
        inProgressTasks: 2,
        pendingTasks: 1,
        upcomingMeetings: 2,
        completionRate: 25
      });
    }

    if (savedMeetings) {
      setUpcomingMeetings(JSON.parse(savedMeetings).filter(m => m.status === 'upcoming'));
    } else {
      const sampleMeetings = [
        { id: 1, title: 'Weekly Team Sync', date: '2024-07-25', time: '10:00 AM', status: 'upcoming' },
        { id: 2, title: 'Project Review', date: '2024-07-27', time: '2:00 PM', status: 'upcoming' }
      ];
      setUpcomingMeetings(sampleMeetings);
      localStorage.setItem('workerMeetings', JSON.stringify(sampleMeetings));
    }
    
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  const statsCards = [
    { 
      title: 'Assigned Tasks', 
      value: stats.assignedTasks, 
      icon: FaTasks, 
      color: 'from-blue-500 to-blue-600',
      onClick: () => navigate('/worker/tasks')
    },
    { 
      title: 'Completed', 
      value: stats.completedTasks, 
      icon: FaCheckCircle, 
      color: 'from-green-500 to-green-600',
      onClick: () => navigate('/worker/tasks')
    },
    { 
      title: 'In Progress', 
      value: stats.inProgressTasks, 
      icon: FaClock, 
      color: 'from-yellow-500 to-yellow-600',
      onClick: () => navigate('/worker/tasks')
    },
    { 
      title: 'Completion Rate', 
      value: `${stats.completionRate}%`, 
      icon: FaChartLine, 
      color: 'from-purple-500 to-purple-600',
      onClick: () => navigate('/worker/tasks')
    },
  ];

  // Get current date and time
  const currentDate = format(new Date(), 'EEEE, MMMM d, yyyy');
  const currentTime = format(new Date(), 'h:mm a');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My Dashboard</h1>
          <p className="text-white/40 text-sm">
            {currentDate} • {currentTime}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
          <span className="text-white/40 text-xs">👋</span>
          <span className="text-white/80 text-sm">Welcome, {user?.name || 'Worker'}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <GlassCard 
              className="cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={stat.onClick}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="text-white text-xl" />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Recent Tasks & Meetings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Recent Tasks</h3>
            <button 
              onClick={() => navigate('/worker/tasks')}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{task.title}</p>
                  <p className="text-white/40 text-xs">Deadline: {task.deadline}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 text-right">
                    <span className="text-white/60 text-xs">{task.progress}%</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    task.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Upcoming Meetings - Removed Join Button */}
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Upcoming Meetings</h3>
            <button 
              onClick={() => navigate('/worker/meetings')}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div>
                  <p className="text-white text-sm">{meeting.title}</p>
                  <p className="text-white/40 text-xs">{meeting.date} at {meeting.time}</p>
                </div>
                {/* Removed Join Button */}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default WorkerDashboard;