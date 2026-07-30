import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaPlay,
  FaPause,
  FaStop,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaUser,
  FaCalendarAlt,
  FaFlag,
  FaFilter,
  FaSave
} from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import toast from 'react-hot-toast';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  // Status configuration
  const STATUS_CONFIG = {
    'pending': { label: 'Pending', color: '#F59E0B', icon: FaClock },
    'in-progress': { label: 'In Progress', color: '#3B82F6', icon: FaPlay },
    'completed': { label: 'Completed', color: '#10B981', icon: FaCheckCircle },
    'stuck': { label: 'Stuck', color: '#EF4444', icon: FaStop },
    'hold': { label: 'Hold', color: '#6B7280', icon: FaPause }
  };

  const PRIORITY_CONFIG = {
    'urgent': { label: 'Urgent', color: '#EF4444' },
    'high': { label: 'High', color: '#F59E0B' },
    'medium': { label: 'Medium', color: '#3B82F6' },
    'low': { label: 'Low', color: '#10B981' }
  };

  // Sample tasks data
  useEffect(() => {
    const sampleTasks = [
      {
        id: 1,
        title: 'Complete dashboard UI',
        description: 'Finalize the dashboard UI with glassmorphism design and all interactive elements',
        status: 'completed',
        priority: 'high',
        assignedTo: 'Sara Ahmed',
        department: 'Design',
        dueDate: '2024-07-20',
        createdDate: '2024-07-10',
        progress: 100,
        subtasks: 3,
        comments: 5,
        attachments: 2
      },
      {
        id: 2,
        title: 'Backend API Integration',
        description: 'Integrate REST APIs for authentication and data management with MongoDB',
        status: 'in-progress',
        priority: 'high',
        assignedTo: 'Fathima Noor',
        department: 'Development',
        dueDate: '2024-07-28',
        createdDate: '2024-07-12',
        progress: 60,
        subtasks: 4,
        comments: 8,
        attachments: 1
      },
      {
        id: 3,
        title: 'User Testing Feedback',
        description: 'Collect and analyze user testing feedback for the new features',
        status: 'pending',
        priority: 'medium',
        assignedTo: 'Ahmed Ali',
        department: 'Design',
        dueDate: '2024-07-25',
        createdDate: '2024-07-15',
        progress: 20,
        subtasks: 2,
        comments: 3,
        attachments: 0
      },
      {
        id: 4,
        title: 'Documentation Update',
        description: 'Update API documentation with new endpoints and authentication flow',
        status: 'stuck',
        priority: 'low',
        assignedTo: 'Mohamed Rashid',
        department: 'Development',
        dueDate: '2024-07-30',
        createdDate: '2024-07-05',
        progress: 30,
        subtasks: 1,
        comments: 2,
        attachments: 1
      },
      {
        id: 5,
        title: 'Deployment Preparation',
        description: 'Prepare for production deployment including environment setup and testing',
        status: 'hold',
        priority: 'urgent',
        assignedTo: 'Ali Hassan',
        department: 'Operations',
        dueDate: '2024-07-18',
        createdDate: '2024-07-08',
        progress: 50,
        subtasks: 5,
        comments: 10,
        attachments: 3
      }
    ];
    setTasks(sampleTasks);
  }, []);

  // Handle status change
  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus }
        : task
    ));
    toast.success(`Status updated to ${STATUS_CONFIG[newStatus]?.label}`);
  };

  // Handle delete
  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
      toast.success('Task deleted');
    }
  };

  // Handle edit
  const handleEdit = (task) => {
    setSelectedTask(task);
    setEditFormData(task);
    setShowEditModal(true);
  };

  // Handle save edit
  const handleSaveEdit = () => {
    setTasks(prev => prev.map(task => 
      task.id === editFormData.id 
        ? { ...editFormData }
        : task
    ));
    toast.success('Task updated successfully');
    setShowEditModal(false);
    setSelectedTask(null);
  };

  // Get departments for filter
  const departments = [...new Set(tasks.map(t => t.department))];

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesDepartment = filterDepartment === 'all' || task.department === filterDepartment;
    return matchesSearch && matchesStatus && matchesPriority && matchesDepartment;
  });

  // Stats
  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const stuckCount = tasks.filter(t => t.status === 'stuck').length;

  return (
    <div className="space-y-6">
      {/* Header - Removed New Task and Export buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Tasks Management</h1>
          <p className="text-white/40 text-sm">View and manage all tasks across departments</p>
        </div>
        {/* Removed New Task and Export buttons */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <GlassCard>
          <p className="text-white/60 text-xs">Total</p>
          <p className="text-xl font-bold text-white">{totalTasks}</p>
        </GlassCard>
        <GlassCard>
          <p className="text-white/60 text-xs">Completed</p>
          <p className="text-xl font-bold text-green-400">{completedCount}</p>
        </GlassCard>
        <GlassCard>
          <p className="text-white/60 text-xs">In Progress</p>
          <p className="text-xl font-bold text-blue-400">{inProgressCount}</p>
        </GlassCard>
        <GlassCard>
          <p className="text-white/60 text-xs">Pending</p>
          <p className="text-xl font-bold text-yellow-400">{pendingCount}</p>
        </GlassCard>
        <GlassCard>
          <p className="text-white/60 text-xs">Stuck</p>
          <p className="text-xl font-bold text-red-400">{stuckCount}</p>
        </GlassCard>
      </div>

      {/* Search & Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[130px]"
            style={{ color: '#ffffff' }}
          >
            <option value="all" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>All Status</option>
            {Object.entries(STATUS_CONFIG).map(([key, val]) => (
              <option key={key} value={key} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                {val.label}
              </option>
            ))}
          </select>

          <select 
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[130px]"
            style={{ color: '#ffffff' }}
          >
            <option value="all" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>All Priority</option>
            {Object.entries(PRIORITY_CONFIG).map(([key, val]) => (
              <option key={key} value={key} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                {val.label}
              </option>
            ))}
          </select>

          <select 
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
            style={{ color: '#ffffff' }}
          >
            <option value="all" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </GlassCard>

      {/* Tasks Table */}
      <GlassCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-800/50">
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Task</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Assigned To</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Department</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Priority</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Due Date</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Progress</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, index) => {
                const statusConfig = STATUS_CONFIG[task.status];
                const priorityConfig = PRIORITY_CONFIG[task.priority];
                
                return (
                  <motion.tr
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-gray-700/50 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <span className="text-white font-medium">{task.title}</span>
                        <p className="text-gray-400 text-xs truncate max-w-[200px]">{task.description}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                          {task.assignedTo.charAt(0)}
                        </div>
                        <span className="text-gray-300">{task.assignedTo}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-300">{task.department}</span>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        className="bg-gray-800 text-white text-sm rounded px-2 py-1 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[110px]"
                        style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                      >
                        {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                          <option key={key} value={key} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                            {val.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <span 
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ 
                          color: priorityConfig?.color || '#9CA3AF',
                          backgroundColor: `${priorityConfig?.color || '#6B7280'}22`
                        }}
                      >
                        {priorityConfig?.label || task.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{task.dueDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <span className="text-gray-400 text-xs">{task.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => {
                            setSelectedTask(task);
                            setShowDetailsModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-colors"
                          title="View Details"
                        >
                          <FaEye className="text-sm" />
                        </button>
                        <button 
                          onClick={() => handleEdit(task)}
                          className="p-1.5 rounded-lg hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-colors"
                          title="Edit"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                        <button 
                          onClick={() => handleDelete(task.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-gray-500 text-sm">
                    No tasks found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Task Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-2xl"
            >
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-lg font-semibold">Task Details</h3>
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setSelectedTask(null);
                    }}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold text-lg">{selectedTask.title}</h4>
                    <p className="text-gray-400 mt-1">{selectedTask.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-xs">Assigned To</p>
                      <p className="text-white">{selectedTask.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Department</p>
                      <p className="text-white">{selectedTask.department}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Status</p>
                      <p className="text-white">{STATUS_CONFIG[selectedTask.status]?.label}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Priority</p>
                      <p className="text-white">{PRIORITY_CONFIG[selectedTask.priority]?.label}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Due Date</p>
                      <p className="text-white">{selectedTask.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Created</p>
                      <p className="text-white">{selectedTask.createdDate}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs mb-1">Progress</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: `${selectedTask.progress}%` }}
                        />
                      </div>
                      <span className="text-white font-medium">{selectedTask.progress}%</span>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2 border-t border-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">Subtasks:</span>
                      <span className="text-white">{selectedTask.subtasks}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">Comments:</span>
                      <span className="text-white">{selectedTask.comments}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">Attachments:</span>
                      <span className="text-white">{selectedTask.attachments}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button 
                      onClick={() => {
                        setShowDetailsModal(false);
                        setSelectedTask(null);
                      }}
                      className="flex-1 py-2 rounded-lg bg-gray-700 text-white/70 hover:bg-gray-600 transition-colors"
                    >
                      Close
                    </button>
                    <button 
                      onClick={() => {
                        setShowDetailsModal(false);
                        handleEdit(selectedTask);
                      }}
                      className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                      Edit Task
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Task Modal */}
      <AnimatePresence>
        {showEditModal && editFormData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg"
            >
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                    <FaEdit className="text-blue-400" />
                    Edit Task
                  </h3>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedTask(null);
                      setEditFormData({});
                    }}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-white/60 text-sm block mb-1">Task Title *</label>
                    <input
                      type="text"
                      value={editFormData.title || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm block mb-1">Description</label>
                    <textarea
                      value={editFormData.description || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rows-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/60 text-sm block mb-1">Status</label>
                      <select
                        value={editFormData.status || 'pending'}
                        onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ color: '#ffffff' }}
                      >
                        {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                          <option key={key} value={key} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                            {val.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-white/60 text-sm block mb-1">Priority</label>
                      <select
                        value={editFormData.priority || 'medium'}
                        onChange={(e) => setEditFormData({ ...editFormData, priority: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ color: '#ffffff' }}
                      >
                        {Object.entries(PRIORITY_CONFIG).map(([key, val]) => (
                          <option key={key} value={key} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                            {val.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/60 text-sm block mb-1">Assigned To</label>
                      <input
                        type="text"
                        value={editFormData.assignedTo || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, assignedTo: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-sm block mb-1">Department</label>
                      <input
                        type="text"
                        value={editFormData.department || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, department: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm block mb-1">Due Date</label>
                    <input
                      type="date"
                      value={editFormData.dueDate || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, dueDate: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditModal(false);
                        setSelectedTask(null);
                        setEditFormData({});
                      }}
                      className="flex-1 py-2 rounded-lg bg-gray-700 text-white/70 hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                    >
                      <FaSave />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tasks;