import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlus } from 'react-icons/fa';
import GlassCard from '../common/GlassCard';

const SubTaskModal = ({ isOpen, onClose, onAdd, task }) => {
  const [formData, setFormData] = useState({
    title: '',
    owner: '',
    dueDate: '',
    status: 'not-started'
  });

  if (!isOpen || !task) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(task.id, formData);
    onClose();
    setFormData({ title: '', owner: '', dueDate: '', status: 'not-started' });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-md"
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">
                Add Subtask to "{task.title}"
              </h3>
              <button
                onClick={onClose}
                className="text-white/40 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white/60 text-sm block mb-1">Subtask Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter subtask title"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/60 text-sm block mb-1">Owner *</label>
                  <input
                    type="text"
                    value={formData.owner}
                    onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Owner name"
                    required
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm block mb-1">Due Date *</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-white/60 text-sm block mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="stuck">Stuck</option>
                  <option value="hold">Hold</option>
                  <option value="dropped">Dropped</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
              >
                <FaPlus />
                Add Subtask
              </button>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SubTaskModal;