import React, { useState, useEffect } from 'react';
import { 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaSort, 
  FaEye, 
  FaEdit,
  FaTrash,
  FaCopy,
  FaArrowUp,
  FaCheckCircle,
  FaClock,
  FaPlay,
  FaStop,
  FaPause,
  FaCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaEllipsisV,
  FaTimes,
  FaArchive,
  FaExchangeAlt,
  FaMagic,
  FaInfoCircle,
  FaSave,
  FaUndo,
  FaUser,
  FaCalendarAlt,
  FaFlag
} from 'react-icons/fa';
import GlassCard from '../common/GlassCard';
import toast from 'react-hot-toast';

// Status configuration
const STATUS_CONFIG = {
  'not-started': { label: 'Not Started', color: '#6B7280' },
  'in-progress': { label: 'In Progress', color: '#3B82F6' },
  'completed': { label: 'Done', color: '#10B981' },
  'stuck': { label: 'Stuck', color: '#EF4444' },
  'hold': { label: 'Hold', color: '#F59E0B' }
};

const PRIORITY_CONFIG = {
  'high': { label: 'High', color: '#EF4444' },
  'medium': { label: 'Medium', color: '#F59E0B' },
  'low': { label: 'Low', color: '#10B981' }
};

const MeetingWorkspace = ({ meetingType = 'F3' }) => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [expandedTasks, setExpandedTasks] = useState({});
  
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSubtaskEditModal, setShowSubtaskEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingSubtask, setEditingSubtask] = useState(null);
  const [editingParentTaskId, setEditingParentTaskId] = useState(null);
  
  // Form data for modals
  const [editFormData, setEditFormData] = useState({
    title: '',
    owner: '',
    dueDate: '',
    priority: 'medium',
    status: 'not-started',
    description: ''
  });
  
  const [newSubtaskInput, setNewSubtaskInput] = useState({});
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showEscalated, setShowEscalated] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    title: '',
    owner: '',
    dueDate: '',
    priority: 'medium',
    description: ''
  });

  // Sample data
  useEffect(() => {
    const sampleTasks = [
      {
        id: 1,
        title: 'Envoy website launch',
        owner: 'Ahmed Ali',
        status: 'stuck',
        dueDate: '2024-07-09',
        priority: 'low',
        lastUpdated: 'Just now',
        description: 'PENDING PAYMENT APPROVAL',
        escalatedTo: meetingType === 'F3' ? 'EXCO' : null,
        escalatedFrom: meetingType === 'EXCO' ? 'F3' : null,
        subtasks: [
          { id: 101, title: 'Design approval', status: 'stuck', owner: 'Sara', dueDate: '2024-07-01' },
          { id: 102, title: 'Content review', status: 'in-progress', owner: 'Mohamed', dueDate: '2024-07-05' }
        ]
      },
      {
        id: 2,
        title: 'Envoy MTM/MTQ launch',
        owner: 'Fathima Noor',
        status: 'completed',
        dueDate: '2024-07-10',
        priority: 'high',
        lastUpdated: 'Just now',
        description: 'MTM/MTQ product launch completed',
        escalatedTo: null,
        escalatedFrom: null,
        subtasks: [
          { id: 201, title: 'Product testing', status: 'completed', owner: 'Ali', dueDate: '2024-07-08' },
          { id: 202, title: 'Marketing materials', status: 'completed', owner: 'Sara', dueDate: '2024-07-09' }
        ]
      },
      {
        id: 3,
        title: 'Upgrading Internet leasing',
        owner: 'Mohamed Rashid',
        status: 'stuck',
        dueDate: '2024-07-11',
        priority: 'medium',
        lastUpdated: '1 week ago',
        description: 'Vendor contract pending',
        escalatedTo: null,
        escalatedFrom: null,
        subtasks: [
          { id: 301, title: 'Vendor selection', status: 'completed', owner: 'Mohamed', dueDate: '2024-07-05' },
          { id: 302, title: 'Contract negotiation', status: 'stuck', owner: 'Ahmed', dueDate: '2024-07-11' }
        ]
      }
    ];
    setTasks(sampleTasks);
  }, [meetingType]);

  // ============= TASK HANDLERS =============
  
  const toggleTask = (taskId) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const selectAllTasks = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(t => t.id));
    }
  };

  // ============= MODAL HANDLERS =============
  
  // Open edit modal for main task
  const openEditModal = (task) => {
    setEditingTask(task);
    setEditFormData({
      title: task.title,
      owner: task.owner,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
      description: task.description || ''
    });
    setShowEditModal(true);
  };

  // Save edited task from modal
  const saveEditedTask = () => {
    if (editFormData.title && editFormData.title.trim()) {
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id 
          ? { 
              ...task, 
              title: editFormData.title.trim(),
              owner: editFormData.owner,
              dueDate: editFormData.dueDate,
              priority: editFormData.priority,
              status: editFormData.status,
              description: editFormData.description,
              lastUpdated: 'Just now'
            }
          : task
      ));
      toast.success('Task updated successfully!');
      setShowEditModal(false);
      setEditingTask(null);
    } else {
      toast.error('Title is required');
    }
  };

  // Open edit modal for subtask
  const openSubtaskEditModal = (taskId, subtask) => {
    setEditingParentTaskId(taskId);
    setEditingSubtask(subtask);
    setEditFormData({
      title: subtask.title,
      owner: subtask.owner,
      dueDate: subtask.dueDate,
      status: subtask.status,
      priority: 'medium',
      description: ''
    });
    setShowSubtaskEditModal(true);
  };

  // Save edited subtask from modal
  const saveEditedSubtask = () => {
    if (editFormData.title && editFormData.title.trim()) {
      setTasks(prev => prev.map(task => {
        if (task.id === editingParentTaskId) {
          const updatedSubtasks = task.subtasks.map(subtask =>
            subtask.id === editingSubtask.id 
              ? { 
                  ...subtask, 
                  title: editFormData.title.trim(),
                  owner: editFormData.owner,
                  dueDate: editFormData.dueDate,
                  status: editFormData.status
                }
              : subtask
          );
          return { ...task, subtasks: updatedSubtasks, lastUpdated: 'Just now' };
        }
        return task;
      }));
      toast.success('Subtask updated successfully!');
      setShowSubtaskEditModal(false);
      setEditingSubtask(null);
      setEditingParentTaskId(null);
    } else {
      toast.error('Title is required');
    }
  };

  // ============= SUBTASK HANDLERS =============
  
  // Add subtask
  const handleAddSubtask = (taskId) => {
    const title = newSubtaskInput[taskId] || 'New subitem';
    if (title && title.trim()) {
      const newSubtask = {
        id: Date.now(),
        title: title.trim(),
        status: 'not-started',
        owner: 'Unassigned',
        dueDate: new Date().toISOString().split('T')[0]
      };
      setTasks(prev => prev.map(task => {
        if (task.id === taskId) {
          return { ...task, subtasks: [...task.subtasks, newSubtask], lastUpdated: 'Just now' };
        }
        return task;
      }));
      setNewSubtaskInput(prev => ({ ...prev, [taskId]: '' }));
      toast.success('Subtask added!');
    }
  };

  // Delete subtask
  const handleDeleteSubtask = (taskId, subtaskId) => {
    if (window.confirm('Delete this subtask?')) {
      setTasks(prev => prev.map(task => {
        if (task.id === taskId) {
          return { 
            ...task, 
            subtasks: task.subtasks.filter(s => s.id !== subtaskId),
            lastUpdated: 'Just now'
          };
        }
        return task;
      }));
      toast.success('Subtask deleted');
    }
  };

  // Duplicate subtask
  const handleDuplicateSubtask = (taskId, subtaskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const subtask = task.subtasks.find(s => s.id === subtaskId);
      if (subtask) {
        const newSubtask = {
          ...subtask,
          id: Date.now() + Math.random(),
          title: `${subtask.title} (Copy)`
        };
        setTasks(prev => prev.map(t => {
          if (t.id === taskId) {
            return { ...t, subtasks: [...t.subtasks, newSubtask], lastUpdated: 'Just now' };
          }
          return t;
        }));
        toast.success('Subtask duplicated');
      }
    }
  };

  // ============= TASK CRUD =============
  
  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus, lastUpdated: 'Just now' }
        : task
    ));
    toast.success(`Status updated to ${STATUS_CONFIG[newStatus]?.label}`);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Delete this task and all its subtasks?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
      setSelectedTasks(prev => prev.filter(id => id !== taskId));
      toast.success('Task deleted');
    }
  };

  const handleDuplicateTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const newTask = {
        ...task,
        id: Date.now(),
        title: `${task.title} (Copy)`,
        subtasks: task.subtasks.map(st => ({ ...st, id: Date.now() + Math.random() })),
        lastUpdated: 'Just now',
        escalatedTo: null,
        escalatedFrom: null
      };
      setTasks(prev => [...prev, newTask]);
      toast.success('Task duplicated');
    }
  };

  const handleEscalate = (taskId) => {
    const targetMeeting = meetingType === 'F3' ? 'EXCO' : 'F3';
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            escalatedTo: targetMeeting, 
            escalatedFrom: meetingType,
            lastUpdated: 'Just now' 
          }
        : task
    ));
    toast.success(`Task escalated to ${targetMeeting}`);
  };

  const handleAddNewTask = () => {
    if (newTaskData.title && newTaskData.title.trim()) {
      const newTask = {
        id: Date.now(),
        title: newTaskData.title.trim(),
        owner: newTaskData.owner || 'Unassigned',
        status: 'not-started',
        dueDate: newTaskData.dueDate || new Date().toISOString().split('T')[0],
        priority: newTaskData.priority || 'medium',
        lastUpdated: 'Just now',
        description: newTaskData.description || '',
        escalatedTo: null,
        escalatedFrom: null,
        subtasks: []
      };
      setTasks(prev => [...prev, newTask]);
      toast.success('New task added!');
      setNewTaskData({ title: '', owner: '', dueDate: '', priority: 'medium', description: '' });
      setShowAddTaskModal(false);
    } else {
      toast.error('Please enter a task title');
    }
  };

  // Bulk actions
  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedTasks.length} tasks?`)) {
      setTasks(prev => prev.filter(task => !selectedTasks.includes(task.id)));
      setSelectedTasks([]);
      toast.success(`${selectedTasks.length} tasks deleted`);
    }
  };

  const handleBulkArchive = () => {
    toast.success(`${selectedTasks.length} tasks archived`);
    setSelectedTasks([]);
  };

  const handleBulkMove = () => {
    toast.success(`Move ${selectedTasks.length} tasks to another workspace`);
    setSelectedTasks([]);
  };

  const handleBulkConvert = () => {
    toast.success(`Converting ${selectedTasks.length} tasks...`);
    setSelectedTasks([]);
  };

  // Filter tasks
  const getFilteredTasks = () => {
    let filtered = tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            task.owner.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    });

    if (showEscalated) {
      filtered = filtered.filter(task => task.escalatedTo === meetingType);
    }

    return filtered;
  };

  const filteredTasks = getFilteredTasks();
  const inProgressTasks = filteredTasks.filter(t => t.status !== 'completed');
  const completedTasks = filteredTasks.filter(t => t.status === 'completed');
  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const escalatedCount = tasks.filter(t => t.escalatedTo === meetingType).length;

  // Render task rows
  const renderTaskRows = (taskList) => {
    return taskList.map((task) => {
      const isExpanded = expandedTasks[task.id] || false;
      const isSelected = selectedTasks.includes(task.id);
      const hasSubtasks = task.subtasks && task.subtasks.length > 0;

      return (
        <React.Fragment key={task.id}>
          <tr className={`border-b border-gray-700/30 hover:bg-white/5 transition-colors ${isSelected ? 'bg-blue-500/5' : ''}`}>
            <td className="py-3 px-3">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleTaskSelection(task.id)}
                className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500 w-4 h-4"
              />
            </td>
            <td className="py-3 px-3">
              <div className="flex items-center gap-2">
                {/* Always show + button to add subtasks */}
                <button
                  onClick={() => toggleTask(task.id)}
                  className="text-gray-500 hover:text-gray-300 transition-colors"
                  title={isExpanded ? "Hide subtasks" : "Add/View subtasks"}
                >
                  {isExpanded ? <FaMinusCircle className="text-xs" /> : <FaPlusCircle className="text-xs" />}
                </button>
                <span className="text-white font-medium text-sm">{task.title}</span>
                {task.escalatedTo && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-400 font-medium">
                    → {task.escalatedTo}
                  </span>
                )}
                {task.escalatedFrom && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-orange-500/20 text-orange-400 font-medium">
                    ↑ from {task.escalatedFrom}
                  </span>
                )}
              </div>
            </td>
            <td className="py-3 px-3 text-gray-300 text-sm">{task.owner}</td>
            <td className="py-3 px-3">
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                className="bg-gray-800 text-white text-sm rounded px-2 py-1 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[100px]"
              >
                {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </td>
            <td className="py-3 px-3 text-gray-300 text-sm">{task.dueDate}</td>
            <td className="py-3 px-3">
              <span 
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={{ 
                  color: PRIORITY_CONFIG[task.priority]?.color || '#9CA3AF',
                  backgroundColor: `${PRIORITY_CONFIG[task.priority]?.color || '#6B7280'}22`
                }}
              >
                {PRIORITY_CONFIG[task.priority]?.label || task.priority}
              </span>
            </td>
            <td className="py-3 px-3 text-gray-400 text-sm">{task.lastUpdated}</td>
            <td className="py-3 px-3 text-gray-400 text-sm max-w-[100px] truncate">{task.description}</td>
            <td className="py-3 px-3">
              {!task.escalatedTo ? (
                <button 
                  onClick={() => handleEscalate(task.id)}
                  className="px-2 py-1 rounded bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors text-xs flex items-center gap-1"
                >
                  <FaArrowUp className="text-xs" />
                  Escalate
                </button>
              ) : (
                <span className="text-purple-400 text-xs font-medium">✓ Escalated</span>
              )}
            </td>
            <td className="py-3 px-3">
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => openEditModal(task)}
                  className="p-1 rounded hover:bg-blue-500/20 text-gray-500 hover:text-blue-400 transition-colors"
                  title="Edit Task"
                >
                  <FaEdit className="text-sm" />
                </button>
                <button 
                  onClick={() => handleDuplicateTask(task.id)}
                  className="p-1 rounded hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                  title="Duplicate Task"
                >
                  <FaCopy className="text-sm" />
                </button>
                <button 
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-1 rounded hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors"
                  title="Delete Task"
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>
            </td>
          </tr>

          {/* Subtasks Section */}
          {isExpanded && (
            <tr>
              <td colSpan="10" className="py-2 px-3 bg-gray-800/10">
                <div className="pl-8 space-y-1">
                  {/* Existing Subtasks */}
                  {hasSubtasks && task.subtasks.map((subtask) => (
                    <div key={subtask.id} className="flex items-center gap-2 py-1.5 hover:bg-white/5 rounded px-2 group">
                      <div 
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: STATUS_CONFIG[subtask.status]?.color || '#6B7280' }}
                      />
                      <span className="text-gray-300 text-sm flex-1">{subtask.title}</span>
                      <span className="text-gray-400 text-sm">{subtask.owner}</span>
                      <span className="text-gray-400 text-sm">{subtask.dueDate}</span>
                      <select
                        value={subtask.status}
                        onChange={(e) => {
                          setTasks(prev => prev.map(task => {
                            if (task.id === task.id) {
                              const updatedSubtasks = task.subtasks.map(s =>
                                s.id === subtask.id 
                                  ? { ...s, status: e.target.value }
                                  : s
                              );
                              return { ...task, subtasks: updatedSubtasks, lastUpdated: 'Just now' };
                            }
                            return task;
                          }));
                        }}
                        className="bg-gray-800 text-white text-xs rounded px-2 py-0.5 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[90px]"
                      >
                        {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                          <option key={key} value={key}>{val.label}</option>
                        ))}
                      </select>
                      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all">
                        <button 
                          onClick={() => openSubtaskEditModal(task.id, subtask)}
                          className="p-0.5 rounded hover:bg-blue-500/20 text-gray-500 hover:text-blue-400 transition-colors"
                          title="Edit Subtask"
                        >
                          <FaEdit className="text-[10px]" />
                        </button>
                        <button 
                          onClick={() => handleDuplicateSubtask(task.id, subtask.id)}
                          className="p-0.5 rounded hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                          title="Duplicate Subtask"
                        >
                          <FaCopy className="text-[10px]" />
                        </button>
                        <button 
                          onClick={() => handleDeleteSubtask(task.id, subtask.id)}
                          className="p-0.5 rounded hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors"
                          title="Delete Subtask"
                        >
                          <FaTrash className="text-[10px]" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add Subtask Input - Always visible when expanded */}
                  <div className="flex items-center gap-2 py-1.5 px-2">
                    <input
                      type="text"
                      placeholder="Add subitem..."
                      value={newSubtaskInput[task.id] || ''}
                      onChange={(e) => setNewSubtaskInput(prev => ({ ...prev, [task.id]: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddSubtask(task.id);
                        }
                      }}
                      className="bg-transparent text-gray-400 text-sm flex-1 focus:outline-none placeholder-gray-600"
                    />
                    <button 
                      onClick={() => handleAddSubtask(task.id)}
                      className="text-gray-500 hover:text-gray-300 transition-colors text-sm"
                    >
                      <FaPlusCircle className="text-sm" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <GlassCard className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setShowAddTaskModal(true)}
            className="px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
          >
            <FaPlus className="text-sm" />
            New Task
          </button>
          
          <button 
            onClick={() => setShowEscalated(!showEscalated)}
            className={`px-3 py-2 rounded text-sm transition-all flex items-center gap-2 ${
              showEscalated 
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <FaArrowUp className="text-xs" />
            Escalated ({escalatedCount})
          </button>
          
          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-2 bg-gray-800/80 border border-gray-700 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-40"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="py-2 px-3 bg-gray-800/80 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="py-2 px-3 bg-gray-800/80 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Priority</option>
              {Object.entries(PRIORITY_CONFIG).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
            <button className="p-2 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
              <FaSort className="text-sm" />
            </button>
            <button className="p-2 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
              <FaEye className="text-sm" />
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Progress Summary */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Progress:</span>
          <div className="w-40 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0}%` }}
            />
          </div>
          <span className="text-white font-medium">{Math.round((completedCount / totalTasks) * 100) || 0}%</span>
        </div>
        <span className="text-gray-600">|</span>
        <span className="text-gray-400">{completedCount}/{totalTasks} tasks completed</span>
        {escalatedCount > 0 && (
          <>
            <span className="text-gray-600">|</span>
            <span className="text-purple-400">{escalatedCount} tasks escalated</span>
          </>
        )}
        <span className="text-gray-600">|</span>
        <span className="text-gray-400 text-xs">Click Edit button to modify tasks/subtasks</span>
      </div>

      {/* In Progress Section */}
      <div>
        <h3 className="text-white font-medium text-base mb-3 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          Work In Progress ({inProgressTasks.length})
        </h3>
        <GlassCard className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-[#0f172a] z-10">
                <tr className="border-b border-gray-700/50">
                  <th className="py-3 px-3 w-6">
                    <input
                      type="checkbox"
                      checked={selectedTasks.length === tasks.length && tasks.length > 0}
                      onChange={selectAllTasks}
                      className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500 w-4 h-4"
                    />
                  </th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium text-sm">Task</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium text-sm">Owner</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium text-sm">Status</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium text-sm">Due date</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium text-sm">Priority</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium text-sm">Last updated</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium text-sm">Text</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium text-sm">Escalate to...</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium text-sm w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {renderTaskRows(inProgressTasks)}
                {inProgressTasks.length === 0 && (
                  <tr>
                    <td colSpan="10" className="text-center py-8 text-gray-500 text-sm">
                      No tasks in progress
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      {/* Completed Section */}
      {completedTasks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-white font-medium text-base mb-3 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            Completed ({completedTasks.length})
          </h3>
          <GlassCard className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-[#0f172a] z-10">
                  <tr className="border-b border-gray-700/50">
                    <th className="py-3 px-3 w-6">
                      <input
                        type="checkbox"
                        className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500 w-4 h-4"
                      />
                    </th>
                    <th className="text-left py-3 px-3 text-gray-400 font-medium text-sm">Task</th>
                    <th className="text-left py-3 px-3 text-gray-400 font-medium text-sm">Owner</th>
                    <th className="text-left py-3 px-3 text-gray-400 font-medium text-sm">Status</th>
                    <th className="text-left py-3 px-3 text-gray-400 font-medium text-sm">Due date</th>
                    <th className="text-left py-3 px-3 text-gray-400 font-medium text-sm">Priority</th>
                    <th className="text-left py-3 px-3 text-gray-400 font-medium text-sm">Last updated</th>
                    <th className="text-left py-3 px-3 text-gray-400 font-medium text-sm">Text</th>
                    <th className="text-left py-3 px-3 text-gray-400 font-medium text-sm">Escalate to...</th>
                    <th className="text-left py-3 px-3 text-gray-400 font-medium text-sm w-24">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {renderTaskRows(completedTasks)}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Add Task Button */}
      <button 
        onClick={() => setShowAddTaskModal(true)}
        className="w-full py-3 rounded-lg border-2 border-dashed border-gray-700 hover:border-blue-500 text-gray-400 hover:text-blue-400 transition-all flex items-center justify-center gap-2 text-sm"
      >
        <FaPlus className="text-sm" />
        Add task
      </button>

      {/* ==================== MODALS ==================== */}

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
            <h3 className="text-white text-lg font-semibold mb-4">New Task</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Task title *"
                value={newTaskData.title}
                onChange={(e) => setNewTaskData({ ...newTaskData, title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Owner"
                value={newTaskData.owner}
                onChange={(e) => setNewTaskData({ ...newTaskData, owner: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={newTaskData.dueDate}
                onChange={(e) => setNewTaskData({ ...newTaskData, dueDate: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newTaskData.priority}
                onChange={(e) => setNewTaskData({ ...newTaskData, priority: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(PRIORITY_CONFIG).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
              <textarea
                placeholder="Description"
                value={newTaskData.description}
                onChange={(e) => setNewTaskData({ ...newTaskData, description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rows-2"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button 
                onClick={() => setShowAddTaskModal(false)}
                className="flex-1 py-2 rounded-lg bg-gray-700 text-white/70 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddNewTask}
                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {showEditModal && editingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">Edit Task</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingTask(null);
                }}
                className="text-white/40 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-white/60 text-sm block mb-1">Task Title *</label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm block mb-1">Owner</label>
                <input
                  type="text"
                  value={editFormData.owner}
                  onChange={(e) => setEditFormData({ ...editFormData, owner: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm block mb-1">Due Date</label>
                <input
                  type="date"
                  value={editFormData.dueDate}
                  onChange={(e) => setEditFormData({ ...editFormData, dueDate: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm block mb-1">Priority</label>
                <select
                  value={editFormData.priority}
                  onChange={(e) => setEditFormData({ ...editFormData, priority: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(PRIORITY_CONFIG).map(([key, val]) => (
                    <option key={key} value={key}>{val.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-white/60 text-sm block mb-1">Status</label>
                <select
                  value={editFormData.status}
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                    <option key={key} value={key}>{val.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-white/60 text-sm block mb-1">Description</label>
                <textarea
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rows-2"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button 
                onClick={() => {
                  setShowEditModal(false);
                  setEditingTask(null);
                }}
                className="flex-1 py-2 rounded-lg bg-gray-700 text-white/70 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveEditedTask}
                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Subtask Modal */}
      {showSubtaskEditModal && editingSubtask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">Edit Subtask</h3>
              <button
                onClick={() => {
                  setShowSubtaskEditModal(false);
                  setEditingSubtask(null);
                  setEditingParentTaskId(null);
                }}
                className="text-white/40 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-white/60 text-sm block mb-1">Subtask Title *</label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm block mb-1">Owner</label>
                <input
                  type="text"
                  value={editFormData.owner}
                  onChange={(e) => setEditFormData({ ...editFormData, owner: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm block mb-1">Due Date</label>
                <input
                  type="date"
                  value={editFormData.dueDate}
                  onChange={(e) => setEditFormData({ ...editFormData, dueDate: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm block mb-1">Status</label>
                <select
                  value={editFormData.status}
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                    <option key={key} value={key}>{val.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button 
                onClick={() => {
                  setShowSubtaskEditModal(false);
                  setEditingSubtask(null);
                  setEditingParentTaskId(null);
                }}
                className="flex-1 py-2 rounded-lg bg-gray-700 text-white/70 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveEditedSubtask}
                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Tasks Action Bar */}
      {selectedTasks.length > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 mb-4 z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 flex items-center gap-3 shadow-2xl">
            <span className="text-white text-sm font-medium">
              {selectedTasks.length} task{selectedTasks.length > 1 ? 's' : ''} selected
            </span>
            <div className="w-px h-6 bg-gray-700" />
            <button 
              onClick={() => {
                selectedTasks.forEach(id => handleDuplicateTask(id));
                setSelectedTasks([]);
              }}
              className="px-2 py-1 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-xs flex items-center gap-1"
            >
              <FaCopy className="text-xs" />
              Duplicate
            </button>
            <button 
              onClick={handleBulkConvert}
              className="px-2 py-1 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-xs flex items-center gap-1"
            >
              Convert
            </button>
            <button 
              onClick={handleBulkMove}
              className="px-2 py-1 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-xs flex items-center gap-1"
            >
              <FaExchangeAlt className="text-xs" />
              Move
            </button>
            <button 
              onClick={handleBulkArchive}
              className="px-2 py-1 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-xs flex items-center gap-1"
            >
              <FaArchive className="text-xs" />
              Archive
            </button>
            <button 
              onClick={handleBulkDelete}
              className="px-2 py-1 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors text-xs flex items-center gap-1"
            >
              <FaTrash className="text-xs" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingWorkspace;