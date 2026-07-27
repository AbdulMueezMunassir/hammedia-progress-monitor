import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaUserPlus,
  FaUserCheck,
  FaUserTimes,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaIdCard,
  FaFilter,
  FaTimes,
  FaSave,
  FaDownload,
  FaUpload,
  FaChevronDown,
  FaChevronRight,
  FaUsers,
  FaUserCircle
} from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import toast from 'react-hot-toast';

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [expandedWorker, setExpandedWorker] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    employeeId: '',
    department: '',
    position: '',
    phone: '',
    role: 'worker',
    isActive: true
  });

  // Departments
  const departments = [
    'Management',
    'Design',
    'Development',
    'Marketing',
    'HR',
    'Finance',
    'Operations',
    'Sales'
  ];

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

  // Sample workers data
  useEffect(() => {
    const sampleWorkers = [
      {
        id: 1,
        name: 'Ahmed Ali',
        email: 'ahmed@hammedia.com',
        employeeId: 'EMP-001',
        department: 'Design',
        position: 'UI/UX Designer',
        phone: '+971 50 123 4567',
        isActive: true,
        joinDate: '2024-01-15',
        tasksCompleted: 12,
        tasksAssigned: 18,
        avatar: 'A'
      },
      {
        id: 2,
        name: 'Fathima Noor',
        email: 'fathima@hammedia.com',
        employeeId: 'EMP-002',
        department: 'Development',
        position: 'Full Stack Developer',
        phone: '+971 50 234 5678',
        isActive: true,
        joinDate: '2024-02-01',
        tasksCompleted: 8,
        tasksAssigned: 15,
        avatar: 'F'
      },
      {
        id: 3,
        name: 'Mohamed Rashid',
        email: 'mohamed@hammedia.com',
        employeeId: 'EMP-003',
        department: 'Marketing',
        position: 'Marketing Manager',
        phone: '+971 50 345 6789',
        isActive: false,
        joinDate: '2023-11-01',
        tasksCompleted: 5,
        tasksAssigned: 10,
        avatar: 'M'
      },
      {
        id: 4,
        name: 'Ishfaq',
        email: 'ishfaq@hammedia.com',
        employeeId: 'EMP-004',
        department: 'HR',
        position: 'HR Manager',
        phone: '+971 50 456 7890',
        isActive: true,
        joinDate: '2024-03-01',
        tasksCompleted: 3,
        tasksAssigned: 10,
        avatar: 'S'
      },
      {
        id: 5,
        name: 'Ali Hassan',
        email: 'ali@hammedia.com',
        employeeId: 'EMP-005',
        department: 'Development',
        position: 'Frontend Developer',
        phone: '+971 50 567 8901',
        isActive: true,
        joinDate: '2024-04-15',
        tasksCompleted: 15,
        tasksAssigned: 20,
        avatar: 'A'
      }
    ];
    setWorkers(sampleWorkers);
  }, []);

  // Handle add worker
  const handleAddWorker = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.employeeId) {
      toast.error('Please fill all required fields');
      return;
    }
    const newWorker = {
      id: Date.now(),
      ...formData,
      joinDate: new Date().toISOString().split('T')[0],
      tasksCompleted: 0,
      tasksAssigned: 0,
      avatar: formData.name.charAt(0).toUpperCase()
    };
    setWorkers(prev => [...prev, newWorker]);
    toast.success('Worker added successfully!');
    setShowAddModal(false);
    resetForm();
  };

  // Handle edit worker
  const handleEditWorker = (e) => {
    e.preventDefault();
    setWorkers(prev => prev.map(worker => 
      worker.id === selectedWorker.id 
        ? { ...worker, ...formData }
        : worker
    ));
    toast.success('Worker updated successfully!');
    setShowEditModal(false);
    setSelectedWorker(null);
    resetForm();
  };

  // Handle delete worker
  const handleDeleteWorker = (id) => {
    if (window.confirm('Are you sure you want to delete this worker?')) {
      setWorkers(prev => prev.filter(worker => worker.id !== id));
      toast.success('Worker deleted successfully');
    }
  };

  // Toggle worker status
  const toggleWorkerStatus = (id) => {
    setWorkers(prev => prev.map(worker => 
      worker.id === id 
        ? { ...worker, isActive: !worker.isActive }
        : worker
    ));
    toast.success('Worker status updated');
  };

  // Toggle expand worker details
  const toggleExpand = (id) => {
    setExpandedWorker(expandedWorker === id ? null : id);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      employeeId: '',
      department: '',
      position: '',
      phone: '',
      role: 'worker',
      isActive: true
    });
  };

  // Filter workers
  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          worker.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || worker.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && worker.isActive) ||
                         (filterStatus === 'inactive' && !worker.isActive);
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Stats
  const totalWorkers = workers.length;
  const activeWorkers = workers.filter(w => w.isActive).length;
  const inactiveWorkers = workers.filter(w => !w.isActive).length;
  const departmentsCount = new Set(workers.map(w => w.department)).size;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Workers Management</h1>
          <p className="text-white/40 text-sm">Manage your team members</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
            <FaDownload />
            Export
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 text-sm"
          >
            <FaUserPlus />
            Add Worker
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Total Workers</p>
              <p className="text-2xl font-bold text-white">{totalWorkers}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <FaUsers className="text-white text-lg" />
            </div>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Active</p>
              <p className="text-2xl font-bold text-green-400">{activeWorkers}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
              <FaUserCheck className="text-white text-lg" />
            </div>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Inactive</p>
              <p className="text-2xl font-bold text-red-400">{inactiveWorkers}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
              <FaUserTimes className="text-white text-lg" />
            </div>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Departments</p>
              <p className="text-2xl font-bold text-purple-400">{departmentsCount}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
              <FaBuilding className="text-white text-lg" />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Search & Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
            <input
              type="text"
              placeholder="Search workers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select 
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[130px]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </GlassCard>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredWorkers.map((worker, index) => (
          <motion.div
            key={worker.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard className="hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ 
                      background: `linear-gradient(135deg, ${deptColors[worker.department] || '#6B7280'}, ${deptColors[worker.department] || '#6B7280'}88)`
                    }}
                  >
                    {worker.avatar || worker.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold truncate">{worker.name}</h3>
                    <p className="text-white/60 text-sm truncate">{worker.position}</p>
                    <p className="text-white/40 text-xs">{worker.employeeId}</p>
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button 
                    onClick={() => {
                      setSelectedWorker(worker);
                      setFormData(worker);
                      setShowEditModal(true);
                    }}
                    className="p-1.5 rounded-lg hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-colors"
                    title="Edit"
                  >
                    <FaEdit className="text-sm" />
                  </button>
                  <button 
                    onClick={() => handleDeleteWorker(worker.id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                  <button 
                    onClick={() => toggleExpand(worker.id)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    title="Details"
                  >
                    {expandedWorker === worker.id ? <FaChevronDown className="text-sm" /> : <FaChevronRight className="text-sm" />}
                  </button>
                </div>
              </div>

              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">Department</span>
                  <span 
                    className="px-2 py-0.5 rounded text-xs font-medium"
                    style={{ 
                      backgroundColor: `${deptColors[worker.department] || '#6B7280'}22`,
                      color: deptColors[worker.department] || '#6B7280'
                    }}
                  >
                    {worker.department}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">Status</span>
                  <button
                    onClick={() => toggleWorkerStatus(worker.id)}
                    className={`px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
                      worker.isActive 
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                        : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    }`}
                  >
                    {worker.isActive ? <FaUserCheck className="text-xs" /> : <FaUserTimes className="text-xs" />}
                    {worker.isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">Tasks</span>
                  <span className="text-white/80">
                    {worker.tasksCompleted}/{worker.tasksAssigned} completed
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">Joined</span>
                  <span className="text-white/80">{worker.joinDate}</span>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedWorker === worker.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-white/10 space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <FaEnvelope className="text-white/30" />
                      <span className="text-white/60">{worker.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaPhone className="text-white/30" />
                      <span className="text-white/60">{worker.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaIdCard className="text-white/30" />
                      <span className="text-white/60">ID: {worker.employeeId}</span>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <button className="flex-1 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 text-xs hover:bg-blue-500/30 transition-colors">
                        View Tasks
                      </button>
                      <button className="flex-1 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 text-xs hover:bg-purple-500/30 transition-colors">
                        Send Message
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Add Worker Modal */}
      <AnimatePresence>
        {showAddModal && (
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
                    <FaUserPlus className="text-blue-400" />
                    Add New Worker
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>

                <form onSubmit={handleAddWorker} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/60 text-sm block mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-sm block mb-1">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/60 text-sm block mb-1">Employee ID *</label>
                      <input
                        type="text"
                        value={formData.employeeId}
                        onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., EMP-001"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-sm block mb-1">Password *</label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Min 6 characters"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/60 text-sm block mb-1">Department *</label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-white/60 text-sm block mb-1">Position *</label>
                      <input
                        type="text"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., UI/UX Designer"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/60 text-sm block mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddModal(false);
                        resetForm();
                      }}
                      className="flex-1 py-2 rounded-lg bg-gray-700 text-white/70 hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                    >
                      <FaSave />
                      Add Worker
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Worker Modal */}
      <AnimatePresence>
        {showEditModal && selectedWorker && (
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
                    Edit Worker
                  </h3>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedWorker(null);
                      resetForm();
                    }}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>

                <form onSubmit={handleEditWorker} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/60 text-sm block mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-sm block mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white cursor-not-allowed opacity-60"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/60 text-sm block mb-1">Department *</label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-white/60 text-sm block mb-1">Position *</label>
                      <input
                        type="text"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/60 text-sm block mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditModal(false);
                        setSelectedWorker(null);
                        resetForm();
                      }}
                      className="flex-1 py-2 rounded-lg bg-gray-700 text-white/70 hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                    >
                      <FaSave />
                      Update Worker
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Workers;