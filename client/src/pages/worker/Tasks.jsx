import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaPlay, FaPause, FaCheckCircle, FaComment, FaPaperclip } from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';

const WorkerTasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks] = useState([
    { 
      id: 1, 
      title: 'Website UI Design', 
      description: 'Design the main dashboard interface with glassmorphism effects',
      status: 'In Progress', 
      priority: 'High',
      deadline: '2024-01-20',
      progress: 75,
      assignedDate: '2024-01-10',
      meeting: 'Design Sprint'
    },
    { 
      id: 2, 
      title: 'Backend API Integration', 
      description: 'Integrate REST APIs for user authentication and task management',
      status: 'Pending', 
      priority: 'High',
      deadline: '2024-01-25',
      progress: 0,
      assignedDate: '2024-01-12',
      meeting: 'Technical Planning'
    },
    { 
      id: 3, 
      title: 'Testing & Bug Fixes', 
      description: 'Test all features and fix identified bugs',
      status: 'Completed', 
      priority: 'Medium',
      deadline: '2024-01-18',
      progress: 100,
      assignedDate: '2024-01-08',
      meeting: 'QA Session'
    },
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-500/20 text-green-400';
      case 'In Progress': return 'bg-blue-500/20 text-blue-400';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">My Tasks</h1>
        <p className="text-white/60 mt-1">View and manage your assigned tasks</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select className="input-field md:w-48">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select className="input-field md:w-48">
          <option value="">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard>
              <div className="space-y-4">
                {/* Task Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">{task.title}</h3>
                    <p className="text-white/60 text-sm mt-1">{task.description}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                      <span className="text-white/60">Meeting: {task.meeting}</span>
                      <span className="text-white/60">Deadline: {task.deadline}</span>
                      <span className="text-white/60">Assigned: {task.assignedDate}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'High' 
                        ? 'bg-red-500/20 text-red-400'
                        : task.priority === 'Medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/60 text-sm">Progress</span>
                    <span className="text-white font-medium">{task.progress}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        task.progress === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                      }`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {task.status !== 'Completed' && (
                    <>
                      {task.status === 'Pending' && (
                        <button className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors flex items-center gap-2">
                          <FaPlay />
                          Start Task
                        </button>
                      )}
                      {task.status === 'In Progress' && (
                        <>
                          <button className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors flex items-center gap-2">
                            <FaPause />
                            Pause
                          </button>
                          <button className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors flex items-center gap-2">
                            <FaCheckCircle />
                            Complete
                          </button>
                        </>
                      )}
                    </>
                  )}
                  <button className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors flex items-center gap-2">
                    <FaComment />
                    Comment
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors flex items-center gap-2">
                    <FaPaperclip />
                    Attach
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkerTasks;