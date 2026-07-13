import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter, 
  FaSort, 
  FaEye, 
  FaPlus, 
  FaChevronDown,
  FaChevronRight,
  FaUser,
  FaCalendarAlt,
  FaFlag,
  FaClock,
  FaEdit,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaExclamationTriangle,
  FaCheckCircle,
  FaPause,
  FaPlay,
  FaStop,
  FaEllipsisV,
  FaTimes
} from 'react-icons/fa';
import GlassCard from '../common/GlassCard';
import AddTaskModal from './AddTaskModal';
import EscalateModal from './EscalateModal';
import toast from 'react-hot-toast';

const MeetingBoard = ({ meetingType = 'F3', meetingData }) => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    'in-progress': true,
    'completed': true
  });

  // Sample data for demonstration
  useEffect(() => {
    const sampleTasks = [
      {
        id: 1,
        title: 'Envoy website launch',
        owner: 'Ahmed Ali',
        status: 'in-progress',
        dueDate: '2024-07-25',
        priority: 'low',
        lastUpdated: '3 days ago',
        description: 'Launch Envoy website with new design',
        escalatedTo: null,
        comments: ['Waiting for content', 'Design approved']
      },
      {
        id: 2,
        title: 'Envoy MTM/MTM launch',
        owner: 'Fathima Noor',
        status: 'in-progress',
        dueDate: '2024-07-28',
        priority: 'high',
        lastUpdated: '3 days ago',
        description: 'Launch MTM product line',
        escalatedTo: null,
        comments: ['Need final approval']
      },
      {
        id: 3,
        title: 'Upgrading Internet leasing',
        owner: 'Mohamed Rashid',
        status: 'in-progress',
        dueDate: '2024-07-30',
        priority: 'medium',
        lastUpdated: '3 days ago',
        description: 'Upgrade internet leasing infrastructure',
        escalatedTo: null,
        comments: ['Vendor coordination pending']
      },
      {
        id: 4,
        title: 'Complete dashboard UI',
        owner: 'Sara Ahmed',
        status: 'completed',
        dueDate: '2024-07-20',
        priority: 'high',
        lastUpdated: '2 days ago',
        description: 'Finalize dashboard UI design',
        escalatedTo: null,
        comments: ['Done - waiting for review']
      },
      {
        id: 5,
        title: 'API documentation',
        owner: 'Ali Hassan',
        status: 'completed',
        dueDate: '2024-07-18',
        priority: 'medium',
        lastUpdated: '5 days ago',
        description: 'Write API documentation',
        escalatedTo: null,
        comments: ['Complete']
      }
    ];
    setTasks(sampleTasks);
  }, []);

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle task escalation
  const handleEscalate = (taskId, escalateTo) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, escalatedTo: escalateTo }
        : task
    ));
    toast.success(`Task escalated to ${escalateTo}`);
  };

  // Handle task status change
  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus }
        : task
    ));
    toast.success(`Task status updated to ${newStatus}`);
  };

  // Handle task deletion
  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast.success('Task deleted');
  };

  // Handle new task
  const handleAddTask = (newTask) => {
    const task = {
      id: Date.now(),
      ...newTask,
      lastUpdated: 'Just now',
      comments: [],
      escalatedTo: null
    };
    setTasks(prev => [...prev, task]);
    toast.success('Task added successfully!');
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let compareA, compareB;
    switch(sortBy) {
      case 'dueDate':
        compareA = new Date(a.dueDate);
        compareB = new Date(b.dueDate);
        break;
      case 'priority':
        const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
        compareA = priorityOrder[a.priority];
        compareB = priorityOrder[b.priority];
        break;
      case 'title':
        compareA = a.title.toLowerCase();
        compareB = b.title.toLowerCase();
        break;
      case 'owner':
        compareA = a.owner.toLowerCase();
        compareB = b.owner.toLowerCase();
        break;
      default:
        compareA = a.id;
        compareB = b.id;
    }
    return sortOrder === 'asc' ? (compareA > compareB ? 1 : -1) : (compareA < compareB ? 1 : -1);
  });

  // Group tasks by status
  const groupedTasks = {
    'in-progress': sortedTasks.filter(t => t.status === 'in-progress'),
    'completed': sortedTasks.filter(t => t.status === 'completed'),
    'pending': sortedTasks.filter(t => t.status === 'pending'),
    'stuck': sortedTasks.filter(t => t.status === 'stuck'),
    'hold': sortedTasks.filter(t => t.status === 'hold')
  };

  // Status labels and colors
  const statusConfig = {
    'in-progress': { label: 'Work In Progress', color: 'bg-yellow-500', icon: FaPlay },
    'completed': { label: 'Completed', color: 'bg-green-500', icon: FaCheckCircle },
    'pending': { label: 'Pending', color: 'bg-blue-500', icon: FaClock },
    'stuck': { label: 'Stuck', color: 'bg-red-500', icon: FaStop },
    'hold': { label: 'Hold', color: 'bg-orange-500', icon: FaPause }
  };

  const priorityColors = {
    'high': 'text-red-400 bg-red-500/10',
    'medium': 'text-yellow-400 bg-yellow-500/10',
    'low': 'text-green-400 bg-green-500/10'
  };

  const getEscalateTarget = (type) => {
    return type === 'F3' ? 'EXCO' : 'F3';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{meetingType} Meeting</h2>
          <p className="text-white/40 text-sm">Manage tasks and action items</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 text-sm"
          >
            <FaPlus />
            New Task
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <GlassCard className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="flex-1 min-w-[200px] relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Filter */}
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="stuck">Stuck</option>
          </select>

          <select 
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Sort */}
          <div className="flex items-center gap-1">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
              <option value="owner">Owner</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              {sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
            </button>
          </div>

          {/* View options */}
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors flex items-center gap-1 text-sm">
            <FaEye />
            Hide
          </button>
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors flex items-center gap-1 text-sm">
            <FaFilter />
            Group by
          </button>
        </div>
      </GlassCard>

      {/* Task Board */}
      <div className="space-y-4">
        {Object.entries(groupedTasks).map(([statusKey, statusTasks]) => {
          if (statusTasks.length === 0) return null;
          const config = statusConfig[statusKey];
          const isExpanded = expandedSections[statusKey];

          return (
            <GlassCard key={statusKey} className="overflow-hidden">
              {/* Section Header */}
              <div 
                className="flex items-center justify-between cursor-pointer p-3 hover:bg-white/5 transition-colors rounded-lg"
                onClick={() => toggleSection(statusKey)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${config.color}`} />
                  <h3 className="text-white font-semibold">{config.label}</h3>
                  <span className="text-white/40 text-sm">({statusTasks.length})</span>
                </div>
                <button className="text-white/40 hover:text-white transition-colors">
                  {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                </button>
              </div>

              {/* Table */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-x-auto"
                  >
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-2 px-3 text-white/40 font-medium">Task</th>
                          <th className="text-left py-2 px-3 text-white/40 font-medium">Owner</th>
                          <th className="text-left py-2 px-3 text-white/40 font-medium">Status</th>
                          <th className="text-left py-2 px-3 text-white/40 font-medium">Due date</th>
                          <th className="text-left py-2 px-3 text-white/40 font-medium">Priority</th>
                          <th className="text-left py-2 px-3 text-white/40 font-medium">Last updated</th>
                          <th className="text-left py-2 px-3 text-white/40 font-medium">Text</th>
                          <th className="text-left py-2 px-3 text-white/40 font-medium">Escalate to ...</th>
                          <th className="text-left py-2 px-3 text-white/40 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {statusTasks.map((task) => (
                          <motion.tr
                            key={task.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                          >
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-medium">{task.title}</span>
                                {task.escalatedTo && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-400">
                                    → {task.escalatedTo}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                  {task.owner.charAt(0)}
                                </div>
                                <span className="text-white/80">{task.owner}</span>
                              </div>
                            </td>
                            <td className="py-2 px-3">
                              <select
                                value={task.status}
                                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                className="bg-white/10 text-white text-xs rounded px-2 py-1 border border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              >
                                {Object.entries(statusConfig).map(([key, val]) => (
                                  <option key={key} value={key}>{val.label}</option>
                                ))}
                              </select>
                            </td>
                            <td className="py-2 px-3 text-white/80">
                              {task.dueDate}
                            </td>
                            <td className="py-2 px-3">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                                {task.priority}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-white/60 text-xs">
                              {task.lastUpdated}
                            </td>
                            <td className="py-2 px-3 text-white/60 text-xs max-w-[100px] truncate">
                              {task.description}
                            </td>
                            <td className="py-2 px-3">
                              {!task.escalatedTo ? (
                                <button
                                  onClick={() => {
                                    setSelectedTask(task);
                                    setShowEscalateModal(true);
                                  }}
                                  className="px-2 py-1 rounded bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors text-xs flex items-center gap-1"
                                >
                                  <FaArrowUp className="text-xs" />
                                  Escalate
                                </button>
                              ) : (
                                <span className="text-purple-400 text-xs font-medium">
                                  Escalated to {task.escalatedTo}
                                </span>
                              )}
                            </td>
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-1">
                                <button 
                                  onClick={() => {
                                    setSelectedTask(task);
                                    setShowAddModal(true);
                                  }}
                                  className="p-1 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                                >
                                  <FaEdit className="text-xs" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteTask(task.id)}
                                  className="p-1 rounded hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors"
                                >
                                  <FaTrash className="text-xs" />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          );
        })}
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddTask}
        meetingType={meetingType}
        editTask={selectedTask}
      />

      {/* Escalate Modal */}
      <EscalateModal
        isOpen={showEscalateModal}
        onClose={() => {
          setShowEscalateModal(false);
          setSelectedTask(null);
        }}
        onEscalate={handleEscalate}
        task={selectedTask}
        targetMeeting={getEscalateTarget(meetingType)}
      />
    </div>
  );
};

export default MeetingBoard;