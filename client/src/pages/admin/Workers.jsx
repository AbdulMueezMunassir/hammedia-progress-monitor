import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';

const Workers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const workers = [
    { id: 1, name: 'Ahmed Ali', email: 'ahmed@hammedia.com', department: 'Design', position: 'UI/UX Designer', status: 'Active' },
    { id: 2, name: 'Fathima Noor', email: 'fathima@hammedia.com', department: 'Development', position: 'Full Stack Developer', status: 'Active' },
    { id: 3, name: 'Mohamed Rashid', email: 'mohamed@hammedia.com', department: 'Marketing', position: 'Marketing Manager', status: 'Inactive' },
    { id: 4, name: 'Sara Ahmed', email: 'sara@hammedia.com', department: 'HR', position: 'HR Manager', status: 'Active' },
    { id: 5, name: 'Ali Hassan', email: 'ali@hammedia.com', department: 'Development', position: 'Frontend Developer', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Workers Management</h1>
          <p className="text-white/60 mt-1">Manage your team members</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <FaUserPlus />
          Add Worker
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search workers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select className="input-field md:w-48">
          <option value="">All Departments</option>
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="marketing">Marketing</option>
          <option value="hr">HR</option>
        </select>
        <select className="input-field md:w-48">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {workers.map((worker, index) => (
          <motion.div
            key={worker.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard className="hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {worker.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{worker.name}</h3>
                    <p className="text-white/60 text-sm">{worker.position}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
                    <FaEdit className="text-sm" />
                  </button>
                  <button className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Email</span>
                  <span className="text-white">{worker.email}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Department</span>
                  <span className="text-white">{worker.department}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    worker.status === 'Active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {worker.status}
                  </span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Workers;