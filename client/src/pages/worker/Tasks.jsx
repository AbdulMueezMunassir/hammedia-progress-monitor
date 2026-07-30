import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaPlay, 
  FaPause, 
  FaCheckCircle, 
  FaClock,
  FaExclamationTriangle,
  FaStop,
  FaComment,
  FaPaperclip,
  FaTimes,
  FaSave,
  FaFileAlt,
  FaUpload,
  FaFilter
} from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const WorkerTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showAttachModal, setShowAttachModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [attachments, setAttachments] = useState([]);

  // ============= NOTIFICATION HELPER =============
  const sendNotification = (task, action, details = '') => {
    const notification = {
      id: Date.now(),
      taskId: task.id,
      taskTitle: task.title,
      action: action,
      details: details,
      user: 'Worker',
      timestamp: new Date().toISOString(),
      read: false
    };
    
    const existingNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    existingNotifications.unshift(notification); // Add to top
    
    // Keep only last 50 notifications to prevent memory issues
    if (existingNotifications.length > 50) {
      existingNotifications.length = 50;
    }
    
    localStorage.setItem('adminNotifications', JSON.stringify(existingNotifications));
    console.log('📢 Notification sent:', notification);
  };

  // ============= LOAD DATA =============
  useEffect(() => {
    const savedTasks = localStorage.getItem('workerTasks');
    const savedComments = localStorage.getItem('workerComments');
    const savedAttachments = localStorage.getItem('workerAttachments');
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      const sampleTasks = [
        { 
          id: 1, 
          title: 'Complete dashboard UI', 
          description: 'Finalize the dashboard UI with glassmorphism design',
          status: 'in-progress', 
          priority: 'high',
          deadline: '2024-07-25',
          progress: 75,
          assignedDate: '2024-07-10',
          meeting: 'Design Sprint',
          comments: [],
          attachments: []
        },
        { 
          id: 2, 
          title: 'Backend API Integration', 
          description: 'Integrate REST APIs for authentication and task management',
          status: 'pending', 
          priority: 'high',
          deadline: '2024-07-30',
          progress: 0,
          assignedDate: '2024-07-12',
          meeting: 'Technical Planning',
          comments: [],
          attachments: []
        },
        { 
          id: 3, 
          title: 'Testing & Bug Fixes', 
          description: 'Test all features and fix identified bugs',
          status: 'completed', 
          priority: 'medium',
          deadline: '2024-07-20',
          progress: 100,
          assignedDate: '2024-07-08',
          meeting: 'QA Session',
          comments: [],
          attachments: []
        },
        { 
          id: 4, 
          title: 'Documentation Update', 
          description: 'Update API documentation with new endpoints',
          status: 'in-progress', 
          priority: 'low',
          deadline: '2024-07-28',
          progress: 40,
          assignedDate: '2024-07-15',
          meeting: 'Documentation Review',
          comments: [],
          attachments: []
        }
      ];
      setTasks(sampleTasks);
      localStorage.setItem('workerTasks', JSON.stringify(sampleTasks));
    }

    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
    if (savedAttachments) {
      setAttachments(JSON.parse(savedAttachments));
    }
    
    setLoading(false);
  }, []);

  // ============= SAVE TO LOCALSTORAGE =============
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('workerTasks', JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('workerComments', JSON.stringify(comments));
    }
  }, [comments, loading]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('workerAttachments', JSON.stringify(attachments));
    }
  }, [attachments, loading]);

  // ============= TASK ACTIONS WITH NOTIFICATIONS =============
  const handleTaskAction = (taskId, action) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        let newStatus = task.status;
        let newProgress = task.progress;
        let updateMessage = '';
        let actionType = '';
        
        switch(action) {
          case 'start':
            newStatus = 'in-progress';
            newProgress = Math.max(task.progress, 10);
            updateMessage = 'Task started';
            actionType = 'started';
            break;
          case 'pause':
            newStatus = 'pending';
            updateMessage = 'Task paused';
            actionType = 'paused';
            break;
          case 'complete':
            if (window.confirm('Mark this task as completed?')) {
              newStatus = 'completed';
              newProgress = 100;
              updateMessage = 'Task completed';
              actionType = 'completed';
              toast.success('🎉 Task completed!');
            } else {
              return task;
            }
            break;
          default:
            return task;
        }
        
        const updatedTask = { ...task, status: newStatus, progress: newProgress };
        
        // Send notification to admin
        sendNotification(
          updatedTask, 
          `${updateMessage} (${newProgress}%)`,
          `Status: ${newStatus} | Progress: ${newProgress}%`
        );
        
        toast.success(updateMessage);
        return updatedTask;
      }
      return task;
    }));
  };

  // ============= PROGRESS UPDATE WITH NOTIFICATION =============
  const updateProgress = (taskId, newProgress) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const progress = Math.min(100, Math.max(0, newProgress));
        const updatedTask = { ...task, progress: progress };
        
        // Send notification to admin
        sendNotification(
          updatedTask, 
          `Progress updated to ${progress}%`,
          `Progress: ${progress}%`
        );
        
        return updatedTask;
      }
      return task;
    }));
  };

  // ============= COMMENT WITH NOTIFICATION =============
  const handleAddComment = () => {
    if (commentText.trim() && selectedTask) {
      const newComment = {
        id: Date.now(),
        taskId: selectedTask.id,
        text: commentText.trim(),
        user: 'Worker',
        timestamp: new Date().toISOString()
      };
      setComments(prev => [...prev, newComment]);
      
      // Send notification to admin
      sendNotification(
        selectedTask, 
        `Added comment: "${commentText.trim().substring(0, 30)}..."`,
        `Comment: ${commentText.trim()}`
      );
      
      setCommentText('');
      setShowCommentModal(false);
      toast.success('Comment added!');
    }
  };

  // ============= ATTACHMENT WITH NOTIFICATION =============
  const handleAddAttachment = (e) => {
    const file = e.target.files[0];
    if (file && selectedTask) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large. Max size 5MB.');
        return;
      }
      
      const newAttachment = {
        id: Date.now(),
        taskId: selectedTask.id,
        name: file.name,
        size: file.size,
        type: file.type,
        timestamp: new Date().toISOString()
      };
      setAttachments(prev => [...prev, newAttachment]);
      
      // Send notification to admin
      sendNotification(
        selectedTask, 
        `Added attachment: "${file.name}"`,
        `File: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`
      );
      
      setShowAttachModal(false);
      toast.success(`File "${file.name}" attached!`);
    }
  };

  // ============= HELPER FUNCTIONS =============
  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'in-progress': return 'bg-blue-500/20 text-blue-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-400 bg-red-500/10';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10';
      case 'low': return 'text-green-400 bg-green-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getTaskComments = (taskId) => {
    return comments.filter(c => c.taskId === taskId);
  };

  const getTaskAttachments = (taskId) => {
    return attachments.filter(a => a.taskId === taskId);
  };

  // ============= FILTERING =============
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.meeting.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">My Tasks</h1>
        <p className="text-white/40 text-sm">View and manage your assigned tasks</p>
        <p className="text-white/30 text-xs mt-1">{format(new Date(), 'EEEE, MMMM d, yyyy • h:mm a')}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <GlassCard>
          <p className="text-white/60 text-xs">Total Tasks</p>
          <p className="text-xl font-bold text-white">{tasks.length}</p>
        </GlassCard>
        <GlassCard>
          <p className="text-white/60 text-xs">Completed</p>
          <p className="text-xl font-bold text-green-400">
            {tasks.filter(t => t.status === 'completed').length}
          </p>
        </GlassCard>
        <GlassCard>
          <p className="text-white/60 text-xs">In Progress</p>
          <p className="text-xl font-bold text-blue-400">
            {tasks.filter(t => t.status === 'in-progress').length}
          </p>
        </GlassCard>
        <GlassCard>
          <p className="text-white/60 text-xs">Pending</p>
          <p className="text-xl font-bold text-yellow-400">
            {tasks.filter(t => t.status === 'pending').length}
          </p>
        </GlassCard>
      </div>

      {/* Search & Filter */}
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
            className="px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select 
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </GlassCard>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task, index) => (
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
                    <div className="flex flex-wrap gap-4 mt-2 text-xs">
                      <span className="text-white/40">Meeting: {task.meeting}</span>
                      <span className="text-white/40">Deadline: {task.deadline}</span>
                      <span className="text-white/40">Assigned: {task.assignedDate}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>

                {/* Comments & Attachments */}
                <div className="flex flex-wrap gap-4 text-xs">
                  <span className="text-white/40">
                    💬 {getTaskComments(task.id).length} comments
                  </span>
                  <span className="text-white/40">
                    📎 {getTaskAttachments(task.id).length} attachments
                  </span>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/60 text-sm">Progress</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={task.progress}
                        onChange={(e) => updateProgress(task.id, parseInt(e.target.value))}
                        className="w-32 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        disabled={task.status === 'completed'}
                      />
                      <span className="text-white font-medium text-sm">{task.progress}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
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
                  {task.status !== 'completed' && (
                    <>
                      {task.status === 'pending' && (
                        <button 
                          onClick={() => handleTaskAction(task.id, 'start')}
                          className="px-4 py-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors flex items-center gap-2 text-sm"
                        >
                          <FaPlay />
                          Start Task
                        </button>
                      )}
                      {task.status === 'in-progress' && (
                        <>
                          <button 
                            onClick={() => handleTaskAction(task.id, 'pause')}
                            className="px-4 py-1.5 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors flex items-center gap-2 text-sm"
                          >
                            <FaPause />
                            Pause
                          </button>
                          <button 
                            onClick={() => handleTaskAction(task.id, 'complete')}
                            className="px-4 py-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors flex items-center gap-2 text-sm"
                          >
                            <FaCheckCircle />
                            Complete
                          </button>
                        </>
                      )}
                    </>
                  )}
                  <button 
                    onClick={() => {
                      setSelectedTask(task);
                      setShowCommentModal(true);
                    }}
                    className="px-4 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors flex items-center gap-2 text-sm"
                  >
                    <FaComment />
                    Comment
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedTask(task);
                      setShowAttachModal(true);
                    }}
                    className="px-4 py-1.5 rounded-lg bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 transition-colors flex items-center gap-2 text-sm"
                  >
                    <FaPaperclip />
                    Attach
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Comment Modal */}
      {showCommentModal && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">
                Add Comment to "{selectedTask.title}"
              </h3>
              <button
                onClick={() => {
                  setShowCommentModal(false);
                  setSelectedTask(null);
                }}
                className="text-white/40 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            <textarea
              placeholder="Write your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rows-4"
            />
            <div className="flex gap-3 mt-4">
              <button 
                onClick={() => {
                  setShowCommentModal(false);
                  setSelectedTask(null);
                  setCommentText('');
                }}
                className="flex-1 py-2 rounded-lg bg-gray-700 text-white/70 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddComment}
                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attach Modal */}
      {showAttachModal && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">
                Attach File to "{selectedTask.title}"
              </h3>
              <button
                onClick={() => {
                  setShowAttachModal(false);
                  setSelectedTask(null);
                }}
                className="text-white/40 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <FaUpload className="text-4xl text-gray-500 mx-auto mb-3" />
              <p className="text-white/60 text-sm mb-2">Click to upload or drag and drop</p>
              <p className="text-white/30 text-xs">PDF, Word, Excel, Images (Max 5MB)</p>
              <input
                type="file"
                onChange={handleAddAttachment}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button 
                onClick={() => {
                  setShowAttachModal(false);
                  setSelectedTask(null);
                }}
                className="flex-1 py-2 rounded-lg bg-gray-700 text-white/70 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerTasks;