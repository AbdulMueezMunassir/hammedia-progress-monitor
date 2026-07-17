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
  FaEdit,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaCheckCircle,
  FaPause,
  FaPlay,
  FaStop,
  FaTimes,
  FaListUl,
  FaPlusCircle,
  FaMinusCircle,
  FaInfoCircle
} from 'react-icons/fa';
import GlassCard from '../common/GlassCard';
import AddTaskModal from './AddTaskModal';
import EscalateModal from './EscalateModal';
import SubTaskModal from './SubTaskModal';
import toast from 'react-hot-toast';

// Status configuration with proper colors
const STATUS_CONFIG = {
  'not-started': { label: 'Not Started', color: '#6B7280', bgColor: '#1F2937', textColor: '#9CA3AF' },
  'in-progress': { label: 'In Progress', color: '#3B82F6', bgColor: '#1E3A5F', textColor: '#60A5FA' },
  'completed': { label: 'Completed', color: '#10B981', bgColor: '#1A3A2A', textColor: '#34D399' },
  'stuck': { label: 'Stuck', color: '#EF4444', bgColor: '#3A1A1A', textColor: '#F87171' },
  'hold': { label: 'Hold', color: '#F59E0B', bgColor: '#3A2A1A', textColor: '#FBBF24' },
  'dropped': { label: 'Dropped', color: '#6B7280', bgColor: '#1F2937', textColor: '#9CA3AF' }
};

// Priority colors
const PRIORITY_CONFIG = {
  'high': { label: 'High', color: '#EF4444', bgColor: '#3A1A1A' },
  'medium': { label: 'Medium', color: '#F59E0B', bgColor: '#3A2A1A' },
  'low': { label: 'Low', color: '#10B981', bgColor: '#1A3A2A' }
};

const MeetingBoard = ({ meetingType = 'F3' }) => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [showSubTaskModal, setShowSubTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    'not-started': true,
    'in-progress': true,
    'completed': true,
    'stuck': true,
    'hold': true,
    'dropped': true
  });
  const [expandedTasks, setExpandedTasks] = useState({});

  // Sample data
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
        escalatedTo: 'EXCO',
        subtasks: [
          { id: 101, title: 'Design homepage', status: 'completed', owner: 'Sara', dueDate: '2024-07-20' },
          { id: 102, title: 'Develop backend API', status: 'in-progress', owner: 'Fathima', dueDate: '2024-07-23' },
          { id: 103, title: 'Content writing', status: 'not-started', owner: 'Mohamed', dueDate: '2024-07-25' },
          { id: 104, title: 'Testing', status: 'not-started', owner: 'Ali', dueDate: '2024-07-26' }
        ]
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
        subtasks: [
          { id: 201, title: 'Product testing', status: 'completed', owner: 'Ali', dueDate: '2024-07-22' },
          { id: 202, title: 'Marketing materials', status: 'in-progress', owner: 'Sara', dueDate: '2024-07-26' },
          { id: 203, title: 'Training session', status: 'not-started', owner: 'Ahmed', dueDate: '2024-07-28' }
        ]
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
        subtasks: [
          { id: 301, title: 'Vendor selection', status: 'completed', owner: 'Mohamed', dueDate: '2024-07-15' },
          { id: 302, title: 'Contract negotiation', status: 'in-progress', owner: 'Ahmed', dueDate: '2024-07-25' },
          { id: 303, title: 'Infrastructure setup', status: 'not-started', owner: 'Fathima', dueDate: '2024-07-30' }
        ]
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
        subtasks: [
          { id: 401, title: 'Design mockups', status: 'completed', owner: 'Sara', dueDate: '2024-07-10' },
          { id: 402, title: 'Frontend implementation', status: 'completed', owner: 'Ali', dueDate: '2024-07-18' },
          { id: 403, title: 'Testing', status: 'completed', owner: 'Fathima', dueDate: '2024-07-20' }
        ]
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
        subtasks: [
          { id: 501, title: 'API endpoints doc', status: 'completed', owner: 'Ali', dueDate: '2024-07-15' },
          { id: 502, title: 'Authentication guide', status: 'completed', owner: 'Mohamed', dueDate: '2024-07-17' }
        ]
      }
    ];
    setTasks(sampleTasks);
  }, []);

  // Toggle section
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Toggle task subtasks
  const toggleTask = (taskId) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // Handle escalate
  const handleEscalate = (taskId, escalateTo) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, escalatedTo: escalateTo }
        : task
    ));
    toast.success(`✅ Task escalated to ${escalateTo}`);
    setShowEscalateModal(false);
    setSelectedTask(null);
  };

  // Handle status change
  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus }
        : task
    ));
    toast.success(`Status updated to ${STATUS_CONFIG[newStatus]?.label || newStatus}`);
  };

  // Handle subtask status change
  const handleSubtaskStatusChange = (taskId, subtaskId, newStatus) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks.map(subtask =>
          subtask.id === subtaskId 
            ? { ...subtask, status: newStatus }
            : subtask
        );
        return { ...task, subtasks: updatedSubtasks };
      }
      return task;
    }));
    toast.success('Subtask status updated');
  };

  // Handle add subtask
  const handleAddSubtask = (taskId, subtaskData) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newSubtask = {
          id: Date.now(),
          ...subtaskData,
          status: 'not-started'
        };
        return { ...task, subtasks: [...task.subtasks, newSubtask] };
      }
      return task;
    }));
    toast.success('Subtask added!');
    setShowSubTaskModal(false);
    setSelectedTask(null);
  };

  // Handle delete task
  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
      toast.success('Task deleted');
    }
  };

  // Handle add task
  const handleAddTask = (newTask) => {
    const task = {
      id: Date.now(),
      ...newTask,
      lastUpdated: 'Just now',
      escalatedTo: null,
      subtasks: []
    };
    setTasks(prev => [...prev, task]);
    toast.success('Task added!');
    setShowAddModal(false);
  };

  // Calculate progress
  const calculateProgress = (task) => {
    if (!task.subtasks || task.subtasks.length === 0) return 0;
    const completed = task.subtasks.filter(s => s.status === 'completed').length;
    return Math.round((completed / task.subtasks.length) * 100);
  };

  // Filter and sort
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Sort
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

  // Group by status
  const groupedTasks = {};
  Object.keys(STATUS_CONFIG).forEach(status => {
    groupedTasks[status] = sortedTasks.filter(t => t.status === status);
  });

  const getEscalateTarget = (type) => {
    return type === 'F3' ? 'EXCO' : 'F3';
  };

  // Check if task can be escalated
  const canEscalate = (task) => {
    return !task.escalatedTo || task.escalatedTo === 'none' || task.escalatedTo === null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{meetingType} Meeting</h2>
          <p className="text-white/40 text-sm">Manage tasks and action items</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 text-sm"
        >
          <FaPlus />
          New Task
        </button>
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
              className="w-full pl-9 pr-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
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

          {/* Priority Filter */}
          <select 
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[130px]"
            style={{ color: '#ffffff' }}
          >
            <option value="all" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>All Priority</option>
            <option value="high" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>High</option>
            <option value="medium" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>Medium</option>
            <option value="low" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>Low</option>
          </select>

          {/* Sort */}
          <div className="flex items-center gap-1">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
              style={{ color: '#ffffff' }}
            >
              <option value="dueDate" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>Due Date</option>
              <option value="priority" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>Priority</option>
              <option value="title" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>Title</option>
              <option value="owner" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>Owner</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 rounded-lg bg-gray-800/80 hover:bg-gray-700/80 text-white/70 hover:text-white transition-colors border border-gray-700"
            >
              {sortOrder === 'asc' ? <FaArrowUp className="text-sm" /> : <FaArrowDown className="text-sm" />}
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Task Board */}
      <div className="space-y-4">
        {Object.entries(groupedTasks).map(([statusKey, statusTasks]) => {
          if (statusTasks.length === 0) return null;
          const config = STATUS_CONFIG[statusKey];
          const isExpanded = expandedSections[statusKey];

          return (
            <GlassCard key={statusKey} className="overflow-hidden">
              {/* Section Header */}
              <div 
                className="flex items-center justify-between cursor-pointer p-3 hover:bg-white/5 transition-colors rounded-lg"
                onClick={() => toggleSection(statusKey)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: config.color }} />
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
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-2 px-3 text-gray-400 font-medium">Task</th>
                          <th className="text-left py-2 px-3 text-gray-400 font-medium">Owner</th>
                          <th className="text-left py-2 px-3 text-gray-400 font-medium">Status</th>
                          <th className="text-left py-2 px-3 text-gray-400 font-medium">Due date</th>
                          <th className="text-left py-2 px-3 text-gray-400 font-medium">Priority</th>
                          <th className="text-left py-2 px-3 text-gray-400 font-medium">Last updated</th>
                          <th className="text-left py-2 px-3 text-gray-400 font-medium">Progress</th>
                          <th className="text-left py-2 px-3 text-gray-400 font-medium">Escalate to ...</th>
                          <th className="text-left py-2 px-3 text-gray-400 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {statusTasks.map((task) => {
                          const progress = calculateProgress(task);
                          const isTaskExpanded = expandedTasks[task.id] || false;
                          const hasSubtasks = task.subtasks && task.subtasks.length > 0;
                          
                          return (
                            <React.Fragment key={task.id}>
                              <tr className="border-b border-gray-700/50 hover:bg-white/5 transition-colors">
                                <td className="py-2 px-3">
                                  <div className="flex items-center gap-2">
                                    {hasSubtasks && (
                                      <button
                                        onClick={() => toggleTask(task.id)}
                                        className="text-gray-400 hover:text-white transition-colors"
                                      >
                                        {isTaskExpanded ? <FaMinusCircle className="text-xs" /> : <FaPlusCircle className="text-xs" />}
                                      </button>
                                    )}
                                    <span className="text-white font-medium">{task.title}</span>
                                    {task.escalatedTo && task.escalatedTo !== 'none' && (
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
                                    <span className="text-gray-300">{task.owner}</span>
                                  </div>
                                </td>
                                <td className="py-2 px-3">
                                  <select
                                    value={task.status}
                                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                    className="bg-gray-800 text-white text-xs rounded px-2 py-1 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[110px]"
                                    style={{ 
                                      backgroundColor: '#1e293b',
                                      color: '#ffffff'
                                    }}
                                  >
                                    {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                                      <option 
                                        key={key} 
                                        value={key}
                                        style={{ 
                                          backgroundColor: '#1e293b', 
                                          color: '#ffffff',
                                          padding: '4px 8px'
                                        }}
                                      >
                                        {val.label}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                                <td className="py-2 px-3 text-gray-300">
                                  {task.dueDate}
                                </td>
                                <td className="py-2 px-3">
                                  <span 
                                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                                    style={{ 
                                      backgroundColor: PRIORITY_CONFIG[task.priority]?.bgColor || '#1F2937',
                                      color: PRIORITY_CONFIG[task.priority]?.color || '#9CA3AF'
                                    }}
                                  >
                                    {task.priority}
                                  </span>
                                </td>
                                <td className="py-2 px-3 text-gray-400 text-xs">
                                  {task.lastUpdated}
                                </td>
                                <td className="py-2 px-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-purple-500"
                                        style={{ width: `${progress}%` }}
                                      />
                                    </div>
                                    <span className="text-gray-400 text-xs">{progress}%</span>
                                  </div>
                                </td>
                                <td className="py-2 px-3">
                                  {canEscalate(task) ? (
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
                                      ✓ Escalated
                                    </span>
                                  )}
                                </td>
                                <td className="py-2 px-3">
                                  <div className="flex items-center gap-1">
                                    {hasSubtasks && (
                                      <button 
                                        onClick={() => {
                                          setSelectedTask(task);
                                          setShowSubTaskModal(true);
                                        }}
                                        className="p-1 rounded hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-colors"
                                        title="Add Subtask"
                                      >
                                        <FaListUl className="text-xs" />
                                      </button>
                                    )}
                                    <button 
                                      onClick={() => {
                                        setSelectedTask(task);
                                        setShowAddModal(true);
                                      }}
                                      className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                      title="Edit Task"
                                    >
                                      <FaEdit className="text-xs" />
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteTask(task.id)}
                                      className="p-1 rounded hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                                      title="Delete Task"
                                    >
                                      <FaTrash className="text-xs" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              
                              {/* Subtasks Row */}
                              {isTaskExpanded && hasSubtasks && (
                                <tr>
                                  <td colSpan="9" className="py-2 px-3 bg-gray-800/30">
                                    <div className="ml-6 space-y-1">
                                      <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                                        <FaListUl />
                                        <span>Subtasks ({task.subtasks.filter(s => s.status === 'completed').length}/{task.subtasks.length})</span>
                                      </div>
                                      {task.subtasks.map((subtask) => (
                                        <div key={subtask.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
                                          <div 
                                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: STATUS_CONFIG[subtask.status]?.color || '#6B7280' }}
                                          />
                                          <span className="text-gray-300 text-sm flex-1">{subtask.title}</span>
                                          <span className="text-gray-400 text-xs">{subtask.owner}</span>
                                          <span className="text-gray-400 text-xs">{subtask.dueDate}</span>
                                          <select
                                            value={subtask.status}
                                            onChange={(e) => handleSubtaskStatusChange(task.id, subtask.id, e.target.value)}
                                            className="bg-gray-800 text-white text-xs rounded px-2 py-0.5 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[100px]"
                                            style={{ 
                                              backgroundColor: '#1e293b',
                                              color: '#ffffff'
                                            }}
                                          >
                                            {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                                              <option 
                                                key={key} 
                                                value={key}
                                                style={{ 
                                                  backgroundColor: '#1e293b', 
                                                  color: '#ffffff',
                                                  padding: '2px 6px'
                                                }}
                                              >
                                                {val.label}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                      ))}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          );
        })}
      </div>

      {/* Modals */}
      <AddTaskModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setSelectedTask(null);
        }}
        onAdd={handleAddTask}
        meetingType={meetingType}
        editTask={selectedTask}
      />

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

      <SubTaskModal
        isOpen={showSubTaskModal}
        onClose={() => {
          setShowSubTaskModal(false);
          setSelectedTask(null);
        }}
        onAdd={handleAddSubtask}
        task={selectedTask}
      />
    </div>
  );
};

export default MeetingBoard;