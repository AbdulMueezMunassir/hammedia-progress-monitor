import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaSearch, FaFilter, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const tasks = [
    { id: 1, title: 'Website UI Design', assignedTo: 'Ahmed', priority: 'High', status: 'In Progress', deadline: '2024-01-20' },
    { id: 2, title: 'Backend API Development', assignedTo: 'Ali', priority: 'High', status: 'Pending', deadline: '2024-01-25' },
    { id: 3, title: 'Database Optimization', assignedTo: 'Fathima', priority: 'Medium', status: 'Completed', deadline: '2024-01-18' },
    { id: 4, title: 'Mobile App Testing', assignedTo: 'Mohamed', priority: 'Low', status: 'Pending', deadline: '2024-01-30' },
    { id: 5, title: 'Documentation', assignedTo: 'Sara', priority: 'Medium', status: 'In Progress', deadline: '2024-01-22' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-500/20 text-green-400';
      case 'In Progress': return 'bg-blue-500/20 text-blue-400';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'High': return <FaExclamationTriangle className="text-red-400" />;
      case 'Medium': return <FaClock className="text-yellow-400" />;
      case 'Low': return <FaCheckCircle className="text-green-400" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Tasks Management</h1>
          <p className="text-white/60 mt-1">Assign and track tasks</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus />
          Assign Task
        </button>
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard className="hover:scale-[1.01] transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    {getPriorityIcon(task.priority)}
                    <div>
                      <h3 className="text-white font-semibold">{task.title}</h3>
                      <p className="text-white/60 text-sm mt-1">
                        Assigned to: {task.assignedTo} • Deadline: {task.deadline}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-white/60">
                    {task.priority}
                  </span>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors">
                    View Details
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

export default Tasks;