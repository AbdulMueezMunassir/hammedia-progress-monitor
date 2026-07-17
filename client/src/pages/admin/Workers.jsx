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
  FaChevronDown,
  FaChevronRight,
  FaTimes,
  FaSave,
  FaUserCircle,
  FaDownload,
  FaUpload
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

  // Sample departments
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
        tasksAssigned: 18
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
        tasksAssigned: 15
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
        tasksAssigned: 10
      },
      {
        id: 4,
        name: 'Sara Ahmed',
        email: 'sara@hammedia.com',
        employeeId: 'EMP-004',
        department: 'HR',
        position: 'HR Manager',
        phone: '+971 50 456 7890',
        isActive: true,
        joinDate: '2024-03-01',
        tasksCompleted: 3,
        tasksAssigned: 6
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
        tasksAssigned: 20
      }
    ];
    setWorkers(sampleWorkers);
  }, []);

  // Handle add worker
  const handleAddWorker = (e) => {
    e.preventDefault();
    const newWorker = {
      id: Date.now(),
      ...formData,
      joinDate: new Date().toISOString().split('T')[0],
      tasksCompleted: 0,
      tasksAssigned: 0
    };
    setWorkers(prev => [...prev, newWorker]);
    toast.success('Worker added successfully!');
    setShowAddModal(false);
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

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard>
          <p className="text-white/60 text-sm">Total Workers</p>
          <p className="text-2xl font-bold text-white">{workers.length}</p>
        </GlassCard>
        <GlassCard>
          <p className="text-white/60 text-sm">Active</p>
          <p className="text-2xl font-bold text-green-400">
            {workers.filter(w => w.isActive).length}
          </p>
        </GlassCard>
        <GlassCard>
          <p className="text-white/60 text-sm">Inactive</p>
          <p className="text-2xl font-bold text-red-400">
            {workers.filter(w => !w.isActive).length}
          </p>
        </GlassCard>
        <GlassCard>
          <p className="text-white/60 text-sm">Departments</p>
          <p className="text-2xl font-bold text-blue-400">
            {new Set(workers.map(w => w.department)).size}
          </p>
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
            style={{ color: '#ffffff' }}
          >
            <option value="all" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                {dept}
              </option>
            ))}
          </select>

          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[130px]"
            style={{ color: '#ffffff' }}
          >
            <option value="all" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>All Status</option>
            <option value="active" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>Active</option>
            <option value="inactive" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>Inactive</option>
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
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${deptColors[worker.department] || '#6B7280'}, ${deptColors[worker.department] || '#6B7280'}88)`
                    }}
                  >
                    {worker.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{worker.name}</h3>
                    <p className="text-white/60 text-sm">{worker.position}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => {
                      setSelectedWorker(worker);
                      setFormData(worker);
                      setShowEditModal(true);
                    }}
                    className="p-1.5 rounded-lg hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <FaEdit className="text-sm" />
                  </button>
                  <button 
                    onClick={() => handleDeleteWorker(worker.id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>

              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">Employee ID</span>
                  <span className="text-white/80">{worker.employeeId}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">Email</span>
                  <span className="text-white/80">{worker.email}</span>
                </div>
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
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Add Worker Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg"
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                    <FaUserPlus className="text-blue-400" />
                    Add New Worker
                  </h3>
                  <button
                    onClick={() => setShowAddModal(false)}
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
                        className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ color: '#ffffff' }}
                        required
                      >
                        <option value="" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-white/60 text-sm block mb-1">Position *</label>
                      <input
                        type="text"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 py-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
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
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Worker Modal */}
      <AnimatePresence>
        {showEditModal && selectedWorker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowEditModal(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg"
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                    <FaEdit className="text-blue-400" />
                    Edit Worker
                  </h3>
                  <button
                    onClick={() => setShowEditModal(false)}
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
                        className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-sm block mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/60 text-sm block mb-1">Employee ID</label>
                      <input
                        type="text"
                        value={formData.employeeId}
                        className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-sm block mb-1">Department *</label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ color: '#ffffff' }}
                        required
                      >
                        {departments.map(dept => (
                          <option key={dept} value={dept} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-white/60 text-sm block mb-1">Position *</label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-white/60 text-sm block mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="flex-1 py-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
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
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Workers;