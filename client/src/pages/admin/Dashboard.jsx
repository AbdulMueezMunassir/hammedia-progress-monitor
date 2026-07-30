import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { 
  FaUsers, 
  FaTasks, 
  FaCheckCircle, 
  FaChartLine,
  FaSearch,
  FaFilter,
  FaEye,
  FaListUl,
  FaCalendarAlt,
  FaClock,
  FaExclamationTriangle,
  FaChevronDown,
  FaChevronRight,
  FaBell,
  FaMoon,
  FaSun
} from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import Loader from '../../components/common/Loader';
import { fetchCompleteDashboard } from '../../redux/slices/dashboardSlice';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dashboardData, loading, error } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedView, setSelectedView] = useState('board');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [expandedDepartments, setExpandedDepartments] = useState({});

  useEffect(() => {
    dispatch(fetchCompleteDashboard());
  }, [dispatch]);

  const toggleDepartment = (deptId) => {
    setExpandedDepartments(prev => ({
      ...prev,
      [deptId]: !prev[deptId]
    }));
  };

  const data = dashboardData?.data || {};
  const summary = data.summary || {};
  const departments = data.departments || [];
  const recentActivity = data.recentActivity || [];
  const meetings = data.meetings || [];
  const actionItems = data.actionItems || { byStatus: {} };

  // Filter departments based on search and department filter
  const filteredDepartments = departments.filter(dept => {
    const deptName = dept.department?.name?.toLowerCase() || '';
    const matchesSearch = deptName.includes(searchTerm.toLowerCase()) || searchTerm === '';
    const matchesFilter = filterDepartment === 'all' || dept.department?.id === filterDepartment;
    return matchesSearch && matchesFilter;
  });

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

  const statusLabels = {
    'not-started': 'Not Started',
    'on-going': 'On Going',
    'stuck': 'Stuck',
    'hold': 'Hold',
    'complete': 'Complete',
    'dropped': 'Dropped'
  };

  const statusColors = {
    'not-started': 'bg-gray-500',
    'on-going': 'bg-yellow-500',
    'stuck': 'bg-red-500',
    'hold': 'bg-orange-500',
    'complete': 'bg-green-500',
    'dropped': 'bg-gray-400'
  };

  // Stats cards with navigation
  const statsCards = [
    { 
      id: 'workers',
      title: 'Total Workers', 
      value: summary.totalWorkers || 0, 
      icon: FaUsers, 
      color: 'from-blue-500 to-blue-600',
      onClick: () => navigate('/admin/workers')
    },
    { 
      id: 'active-tasks',
      title: 'Active Tasks', 
      value: summary.inProgressTasks || 0, 
      icon: FaTasks, 
      color: 'from-purple-500 to-purple-600',
      onClick: () => navigate('/admin/tasks')
    },
    { 
      id: 'completed',
      title: 'Completed', 
      value: summary.completedTasks || 0, 
      icon: FaCheckCircle, 
      color: 'from-green-500 to-green-600',
      onClick: () => navigate('/admin/tasks')
    },
    { 
      id: 'completion-rate',
      title: 'Completion Rate', 
      value: `${summary.completionRate || 0}%`, 
      icon: FaChartLine, 
      color: 'from-orange-500 to-orange-600',
      onClick: () => navigate('/admin/reports')
    },
  ];

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

      {/* Search and Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* View Toggle - Working */}
          <div className="flex rounded-lg bg-white/5 p-0.5">
            <button
              onClick={() => setSelectedView('board')}
              className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                selectedView === 'board' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <FaListUl className="inline mr-1" />
              Board
            </button>
            <button
              onClick={() => setSelectedView('list')}
              className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                selectedView === 'list' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <FaEye className="inline mr-1" />
              List
            </button>
          </div>

          {/* Department Filter - Working */}
          <select 
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
            style={{ color: '#ffffff' }}
          >
            <option value="all" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>All Departments</option>
            {departments.map((dept, idx) => {
              const deptName = dept.department?.name || 'Department';
              return (
                <option key={idx} value={dept.department?.id || idx} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                  {deptName}
                </option>
              );
            })}
          </select>
        </div>
      </GlassCard>

      {/* Department Boards - Board View */}
      {selectedView === 'board' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Department Boards</h3>
            <span className="text-white/40 text-sm">{filteredDepartments.length} departments</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDepartments.map((dept, index) => {
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
                    <div 
                      className="flex items-center justify-between cursor-pointer p-3"
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
                        <span className="text-white/40 text-xs">
                          {dept.stats?.completionRate || 0}% complete
                        </span>
                        <button className="text-white/40 hover:text-white transition-colors">
                          {isExpanded ? <FaChevronDown className="text-xs" /> : <FaChevronRight className="text-xs" />}
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-3 pt-0 border-t border-white/5 mt-2">
                        <div className="text-white/60 text-sm">No items to display</div>
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {selectedView === 'list' && (
        <GlassCard>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-800/30">
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Department</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Code</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Total Items</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Completion</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepartments.map((dept, index) => {
                  const deptName = dept.department?.name || 'Department';
                  const color = deptColors[deptName] || '#6B7280';
                  const completionRate = dept.stats?.completionRate || 0;
                  
                  return (
                    <tr key={index} className="border-b border-gray-700/50 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                          <span className="text-white">{deptName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{dept.department?.code || '-'}</td>
                      <td className="py-3 px-4 text-gray-300">{dept.stats?.total || 0}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-purple-500"
                              style={{ width: `${completionRate}%` }}
                            />
                          </div>
                          <span className="text-gray-400 text-xs">{completionRate}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          completionRate >= 70 ? 'bg-green-500/20 text-green-400' :
                          completionRate >= 40 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {completionRate >= 70 ? 'Good' :
                           completionRate >= 40 ? 'Average' : 'Needs Attention'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* Action Items & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Action Items */}
        <GlassCard>
          <h4 className="text-white font-medium mb-3 flex items-center gap-2">
            <FaExclamationTriangle className="text-yellow-400 text-sm" />
            Action Items
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(statusLabels).map(([key, label]) => {
              const count = actionItems.byStatus?.[key] || 0;
              return (
                <div key={key} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${statusColors[key] || 'bg-gray-500'}`} />
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
                      {activity.user} • {activity.time ? format(new Date(activity.time), 'MMM d, h:mm a') : 'Just now'}
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
  );
};

export default Dashboard;