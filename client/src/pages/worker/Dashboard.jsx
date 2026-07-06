import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTasks, FaCheckCircle, FaClock, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';

const WorkerDashboard = () => {
  const [stats, setStats] = useState({
    assignedTasks: 8,
    completedTasks: 3,
    pendingTasks: 5,
    upcomingMeetings: 2,
  });

  const [recentTasks] = useState([
    { id: 1, title: 'Website UI Design', status: 'In Progress', deadline: '2024-01-20', progress: 75 },
    { id: 2, title: 'Backend API Integration', status: 'Pending', deadline: '2024-01-25', progress: 0 },
    { id: 3, title: 'Testing & Bug Fixes', status: 'Completed', deadline: '2024-01-18', progress: 100 },
    { id: 4, title: 'Documentation', status: 'In Progress', deadline: '2024-01-22', progress: 40 },
  ]);

  const upcomingMeetings = [
    { id: 1, title: 'Weekly Team Sync', date: '2024-01-15', time: '10:00 AM' },
    { id: 2, title: 'Project Review', date: '2024-01-16', time: '2:00 PM' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Assigned Tasks</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.assignedTasks}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <FaTasks className="text-white text-xl" />
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Completed Tasks</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.completedTasks}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
              <FaCheckCircle className="text-white text-xl" />
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Pending Tasks</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.pendingTasks}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center">
              <FaClock className="text-white text-xl" />
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Upcoming Meetings</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.upcomingMeetings}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
              <FaCalendarAlt className="text-white text-xl" />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Recent Tasks */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Recent Tasks</h3>
        <div className="space-y-4">
          {recentTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{task.title}</h4>
                    <p className="text-white/60 text-sm mt-1">Deadline: {task.deadline}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            task.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <p className="text-white/60 text-xs mt-1 text-right">{task.progress}%</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.status === 'Completed' 
                        ? 'bg-green-500/20 text-green-400'
                        : task.status === 'In Progress'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upcoming Meetings */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Upcoming Meetings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingMeetings.map((meeting, index) => (
            <motion.div
              key={meeting.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <FaCalendarAlt className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{meeting.title}</h4>
                    <p className="text-white/60 text-sm mt-1">{meeting.date} at {meeting.time}</p>
                    <button className="mt-2 text-blue-400 hover:text-blue-300 text-sm transition-colors">
                      Join Meeting
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;