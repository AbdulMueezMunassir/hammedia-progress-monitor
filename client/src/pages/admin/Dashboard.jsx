import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { format, formatDistanceToNow } from 'date-fns';
import { 
  FaUsers, 
  FaTasks, 
  FaCheckCircle, 
  FaClock, 
  FaExclamationTriangle,
  FaCalendarAlt,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaFilter,
  FaSearch,
  FaBell,
  FaEye,
  FaPlus,
  FaEllipsisV,
  FaChevronDown,
  FaChevronRight,
  FaTimes
} from 'react-icons/fa';

// Components
import GlassCard from '../../components/common/GlassCard';
import Loader from '../../components/common/Loader';
import { fetchCompleteDashboard } from '../../redux/slices/dashboardSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dashboardData, loading, error } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);
  
  // State
  const [selectedView, setSelectedView] = useState('board');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [expandedDepartments, setExpandedDepartments] = useState({});
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  useEffect(() => {
    dispatch(fetchCompleteDashboard());
  }, [dispatch]);

  // Toggle department expansion
  const toggleDepartment = (deptId) => {
    setExpandedDepartments(prev => ({
      ...prev,
      [deptId]: !prev[deptId]
    }));
  };

  // Handle stats card click
  const handleStatsClick = (statId) => {
    switch(statId) {
      case 'workers':
        navigate('/admin/workers');
        toast.success('Navigating to Workers...');
        break;
      case 'active-tasks':
        navigate('/admin/tasks');
        toast.success('Navigating to Tasks...');
        break;
      case 'completed':
        navigate('/admin/tasks');
        toast.success('Navigating to Completed Tasks...');
        break;
      case 'completion-rate':
        navigate('/admin/reports');
        toast.success('Navigating to Reports...');
        break;
      default:
        break;
    }
  };

  // Data
  const data = dashboardData?.data || {};
  const summary = data.summary || {};
  const departments = data.departments || [];
  const recentActivity = data.recentActivity || [];
  const meetings = data.meetings || [];

  // Department colors
  const deptColors = {
    'Management': '#3B82F6',
    'Design': '#8B5CF6',
    'Development': '#10B981',
    'Marketing': '#F59E0B',
    'HR': '#EF4444',
    'Finance': '#EC4899',
    'Operations': '#14B8A6',
    'Sales': '#F97316'
  };

  const statusColors = {
    'not-started': 'bg-gray-500',
    'on-going': 'bg-yellow-500',
    'stuck': 'bg-red-500',
    'hold': 'bg-orange-500',
    'complete': 'bg-green-500',
    'dropped': 'bg-gray-400'
  };

  const statusLabels = {
    'not-started': 'Not Started',
    'on-going': 'On Going',
    'stuck': 'Stuck',
    'hold': 'Hold',
    'complete': 'Complete',
    'dropped': 'Dropped'
  };

  // Stats cards
  const statsCards = [
    { 
      id: 'workers',
      title: 'Total Workers', 
      value: summary.totalWorkers || 0, 
      icon: FaUsers, 
      color: 'from-blue-500 to-blue-600',
      onClick: () => handleStatsClick('workers')
    },
    { 
      id: 'active-tasks',
      title: 'Active Tasks', 
      value: summary.inProgressTasks || 0, 
      icon: FaTasks, 
      color: 'from-purple-500 to-purple-600',
      onClick: () => handleStatsClick('active-tasks')
    },
    { 
      id: 'completed',
      title: 'Completed', 
      value: summary.completedTasks || 0, 
      icon: FaCheckCircle, 
      color: 'from-green-500 to-green-600',
      onClick: () => handleStatsClick('completed')
    },
    { 
      id: 'completion-rate',
      title: 'Completion Rate', 
      value: `${summary.completionRate || 0}%`, 
      icon: FaChartLine, 
      color: 'from-orange-500 to-orange-600',
      onClick: () => handleStatsClick('completion-rate')
    },
  ];

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New task assigned', message: 'You have been assigned to "Dashboard UI Design"', time: new Date(), read: false, type: 'task' },
    { id: 2, title: 'Meeting reminder', message: 'Weekly F3 meeting in 30 minutes', time: new Date(Date.now() - 1800000), read: false, type: 'meeting' },
    { id: 3, title: 'Task completed', message: 'Ahmed completed "Backend API Integration"', time: new Date(Date.now() - 3600000), read: true, type: 'task' },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Mock action items for demonstration
  const mockActionItems = [
    { id: 1, title: 'Complete dashboard redesign', status: 'on-going', priority: 'high', department: 'Design', owner: 'Ahmed', deadline: '2024-07-20' },
    { id: 2, title: 'API integration for auth', status: 'not-started', priority: 'high', department: 'Development', owner: 'Fathima', deadline: '2024-07-25' },
    { id: 3, title: 'User testing feedback', status: 'complete', priority: 'medium', department: 'Design', owner: 'Sara', deadline: '2024-07-15' },
    { id: 4, title: 'Documentation update', status: 'hold', priority: 'low', department: 'Development', owner: 'Mohamed', deadline: '2024-07-30' },
    { id: 5, title: 'Deployment preparation', status: 'stuck', priority: 'urgent', department: 'Operations', owner: 'Ali', deadline: '2024-07-18' },
  ];

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-xl">Error loading dashboard</div>
        <p className="text-white/60 mt-2">{error}</p>
        <button 
          onClick={() => dispatch(fetchCompleteDashboard())}
          className="mt-4 btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-white/40 text-sm">
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
            <span className="text-white/40 text-xs">👋</span>
            <span className="text-white/80 text-sm">Welcome, {user?.name || 'Admin'}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* View toggle */}
          <div className="flex rounded-lg bg-white/5 p-0.5">
            <button
              onClick={() => setSelectedView('board')}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                selectedView === 'board' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Board
            </button>
            <button
              onClick={() => setSelectedView('list')}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                selectedView === 'list' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              List
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-40 md:w-56"
            />
          </div>

          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
              <FaFilter />
              Filter
              <FaChevronDown className="text-xs" />
            </button>
            
            <AnimatePresence>
              {showFilterDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-64 glass rounded-xl border border-white/10 shadow-xl z-50 p-4"
                >
                  <div className="space-y-3">
                    <div>
                      <label className="text-white/60 text-xs block mb-1">Status</label>
                      <select 
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                      >
                        <option value="all">All Status</option>
                        {Object.entries(statusLabels).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-white/60 text-xs block mb-1">Department</label>
                      <select 
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                      >
                        <option value="all">All Departments</option>
                        {departments.map((dept, idx) => (
                          <option key={idx} value={dept.department?.id || idx}>
                            {dept.department?.name || 'Department'}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button 
                      onClick={() => setShowFilterDropdown(false)}
                      className="w-full btn-primary text-sm py-1.5"
                    >
                      Apply Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors relative"
            >
              <FaBell className="text-lg" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 glass rounded-xl border border-white/10 shadow-xl z-50 overflow-hidden"
                >
                  <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-white font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-white/40 text-xs hover:text-white transition-colors"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-white/40 text-sm text-center py-4">No notifications</p>
                    ) : (
                      notifications.map((notif) => (
                        <div 
                          key={notif.id}
                          onClick={() => markAsRead(notif.id)}
                          className={`p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 ${
                            !notif.read ? 'bg-blue-500/5 border-l-2 border-l-blue-500' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                              notif.type === 'task' ? 'bg-blue-500' :
                              notif.type === 'meeting' ? 'bg-purple-500' :
                              'bg-green-500'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium">{notif.title}</p>
                              <p className="text-white/60 text-xs mt-0.5">{notif.message}</p>
                              <p className="text-white/30 text-xs mt-1">
                                {formatDistanceToNow(notif.time, { addSuffix: true })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.id}
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Boards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Department Boards</h3>
            <span className="text-white/40 text-sm">{departments.length} departments</span>
          </div>

          <div className="space-y-4">
            {departments.length === 0 ? (
              <GlassCard>
                <p className="text-white/40 text-sm text-center py-4">No departments available</p>
              </GlassCard>
            ) : (
              departments.map((dept, index) => {
                const deptId = dept.department?.id || `dept-${index}`;
                const isExpanded = expandedDepartments[deptId] || false;
                const deptName = dept.department?.name || 'Department';
                const color = deptColors[deptName] || '#6B7280';
                
                return (
                  <motion.div
                    key={deptId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GlassCard className="overflow-hidden">
                      {/* Department Header */}
                      <div 
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleDepartment(deptId)}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: color }}
                          />
                          <h4 className="text-white font-medium">{deptName}</h4>
                          <span className="text-white/30 text-xs">{dept.department?.code || ''}</span>
                          <span className="px-2 py-0.5 rounded text-xs bg-white/10 text-white/60">
                            {dept.stats?.total || 0} items
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-white/40 text-xs">
                              {dept.stats?.completionRate || 0}% complete
                            </span>
                            <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full transition-all duration-500"
                                style={{ 
                                  width: `${dept.stats?.completionRate || 0}%`,
                                  backgroundColor: color
                                }}
                              />
                            </div>
                          </div>
                          <button className="text-white/40 hover:text-white transition-colors">
                            {isExpanded ? <FaChevronDown className="text-xs" /> : <FaChevronRight className="text-xs" />}
                          </button>
                        </div>
                      </div>

                      {/* Items List */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 space-y-1.5"
                          >
                            {mockActionItems
                              .filter(item => item.department === deptName)
                              .map((item) => (
                                <div 
                                  key={item.id}
                                  className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                                >
                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusColors[item.status] || 'bg-gray-500'}`} />
                                    <span className="text-white text-sm truncate">{item.title}</span>
                                  </div>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="text-white/30 text-xs">{item.owner}</span>
                                    <select 
                                      className="bg-white/10 text-white text-xs rounded px-1.5 py-0.5 border border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                      defaultValue={item.status}
                                    >
                                      {Object.entries(statusLabels).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              ))}
                            {mockActionItems.filter(item => item.department === deptName).length === 0 && (
                              <p className="text-white/30 text-sm text-center py-2">No items in this department</p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </GlassCard>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Action Items Overview */}
          <GlassCard>
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <FaExclamationTriangle className="text-yellow-400 text-sm" />
              Action Items
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(statusLabels).map(([key, label]) => {
                const count = mockActionItems.filter(i => i.status === key).length;
                return (
                  <div key={key} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${statusColors[key]}`} />
                      <span className="text-white/60 text-xs">{label}</span>
                    </div>
                    <span className="text-white font-medium text-sm">{count}</span>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Recent Activity */}
          <GlassCard>
            <h4 className="text-white font-medium mb-3">Recent Activity</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {recentActivity.length === 0 ? (
                <p className="text-white/30 text-sm text-center py-2">No recent activity</p>
              ) : (
                recentActivity.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 text-sm truncate">{activity.title || 'Activity'}</p>
                      <p className="text-white/30 text-xs">
                        {activity.user} • {activity.time ? formatDistanceToNow(new Date(activity.time), { addSuffix: true }) : 'Just now'}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </GlassCard>

          {/* Upcoming Meetings */}
          <GlassCard>
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <FaCalendarAlt className="text-purple-400 text-sm" />
              Upcoming Meetings
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {meetings.length === 0 ? (
                <p className="text-white/30 text-sm text-center py-2">No meetings scheduled</p>
              ) : (
                meetings.slice(0, 4).map((meeting, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <div>
                      <p className="text-white/80 text-sm">{meeting.title || 'Meeting'}</p>
                      <p className="text-white/30 text-xs">
                        {meeting.date ? format(new Date(meeting.date), 'MMM d, h:mm a') : 'TBD'}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      meeting.type === 'F3' 
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-purple-500/20 text-purple-400'
                    }`}>
                      {meeting.type || 'F3'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;