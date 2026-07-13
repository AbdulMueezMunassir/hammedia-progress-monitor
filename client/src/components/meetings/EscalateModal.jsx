import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaArrowUp } from 'react-icons/fa';
import GlassCard from '../common/GlassCard';

const EscalateModal = ({ isOpen, onClose, onEscalate, task, targetMeeting }) => {
  const [reason, setReason] = useState('');

  if (!isOpen || !task) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onEscalate(task.id, targetMeeting);
    onClose();
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
              <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                <FaArrowUp className="text-purple-400" />
                Escalate Task
              </h3>
              <button
                onClick={onClose}
                className="text-white/40 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="mb-4 p-3 rounded-lg bg-white/5">
              <p className="text-white/60 text-sm">Task</p>
              <p className="text-white font-medium">{task.title}</p>
              <p className="text-white/40 text-xs mt-1">Owner: {task.owner}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white/60 text-sm block mb-1">
                  Escalate to {targetMeeting}
                </label>
                <p className="text-white/40 text-sm">
                  This will move the task to the {targetMeeting} meeting for review.
                </p>
              </div>

              <div>
                <label className="text-white/60 text-sm block mb-1">Reason for Escalation</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows="3"
                  placeholder="Explain why this needs to be escalated..."
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaArrowUp />
                  Escalate to {targetMeeting}
                </button>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EscalateModal;