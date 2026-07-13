import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaCheck, 
  FaClock, 
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
  FaFilter
} from 'react-icons/fa';
import GlassCard from './GlassCard';

const DepartmentBoard = ({ department, actionItems, previousItems, onUpdate, onEscalate }) => {
  const [filter, setFilter] = useState('all');
  const [editingItem, setEditingItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const statusOptions = [
    { value: 'not-started', label: 'Not Started', color: 'bg-gray-500' },
    { value: 'on-going', label: 'On Going', color: 'bg-yellow-500' },
    { value: 'stuck', label: 'Stuck', color: 'bg-red-500' },
    { value: 'hold', label: 'Hold', color: 'bg-orange-500' },
    { value: 'complete', label: 'Complete', color: 'bg-green-500' },
    { value: 'dropped', label: 'Dropped', color: 'bg-gray-400' }
  ];

  const filteredItems = filter === 'all' 
    ? actionItems 
    : actionItems.filter(item => item.status === filter);

  const getStatusBadge = (status) => {
    const option = statusOptions.find(s => s.value === status);
    return option || statusOptions[0];
  };

  return (
    <GlassCard className="p-4">
      {/* Board Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: department.color || '#6B7280' }}
          />
          <h3 className="text-white font-semibold">{department.name}</h3>
          <span className="text-white/40 text-sm">({department.code})</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowAddModal(true)}
            className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
          >
            <FaPlus className="text-xs" />
          </button>
          <button className="p-1.5 rounded-lg bg-white/5 text-white/60 hover:text-white transition-colors">
            <FaFilter className="text-xs" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-white/60">Progress</span>
          <span className="text-white font-medium">
            {actionItems.length > 0 
              ? Math.round((actionItems.filter(i => i.status === 'complete').length / actionItems.length) * 100)
              : 0}%
          </span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${actionItems.length > 0 
                ? Math.round((actionItems.filter(i => i.status === 'complete').length / actionItems.length) * 100)
                : 0}%`,
              backgroundColor: department.color || '#3B82F6'
            }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-2 py-1 rounded text-xs transition-colors ${
            filter === 'all' 
              ? 'bg-white/20 text-white' 
              : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          All ({actionItems.length})
        </button>
        {statusOptions.map(opt => {
          const count = actionItems.filter(i => i.status === opt.value).length;
          return count > 0 && (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                filter === opt.value 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {opt.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Action Items List */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <p className="text-white/40 text-sm text-center py-4">
            No action items {filter !== 'all' ? `with status "${filter}"` : ''}
          </p>
        ) : (
          filteredItems.map((item, index) => {
            const statusBadge = getStatusBadge(item.status);
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
              >
                {/* Item Content */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="mt-1.5 flex-shrink-0">
                    <div className={`w-2 h-2 rounded-full ${statusBadge.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{item.description}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-white/40 mt-0.5">
                      <span>Owner: {item.owner?.name}</span>
                      <span>•</span>
                      <span>Due: {new Date(item.deadlineDate).toLocaleDateString()}</span>
                      {item.escalatedTo !== 'none' && (
                        <>
                          <span>•</span>
                          <span className="text-purple-400">Escalated to {item.escalatedTo}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  {/* Progress */}
                  <div className="w-12 text-right">
                    <span className="text-white/60 text-xs">{item.progress || 0}%</span>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${statusBadge.color} bg-opacity-20 text-opacity-80`}>
                    {statusBadge.label}
                  </span>

                  {/* Action Buttons - Only if user can edit */}
                  {item.canEdit && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* Status dropdown */}
                      <select
                        value={item.status}
                        onChange={(e) => onUpdate(item._id, { status: e.target.value })}
                        className="bg-white/10 text-white text-xs rounded px-1 py-0.5 border border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        {statusOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>

                      {/* Escalate button */}
                      {!item.escalatedTo || item.escalatedTo === 'none' && (
                        <button
                          onClick={() => onEscalate(item._id)}
                          className="p-1 rounded hover:bg-purple-500/20 text-purple-400 transition-colors"
                          title="Escalate"
                        >
                          <FaArrowUp className="text-xs" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Previous Week Comparison */}
      {previousItems && previousItems.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/40">Previous Week</span>
            <div className="flex items-center gap-2">
              <span className="text-white/60">
                {previousItems.filter(i => i.status === 'complete').length} complete
              </span>
              <span className="text-white/40">|</span>
              <span className="text-white/60">
                {previousItems.length} total
              </span>
              {actionItems.length > previousItems.length ? (
                <span className="text-green-400 flex items-center gap-0.5">
                  <FaArrowUp className="text-[10px]" />
                  {actionItems.length - previousItems.length}
                </span>
              ) : actionItems.length < previousItems.length ? (
                <span className="text-red-400 flex items-center gap-0.5">
                  <FaArrowDown className="text-[10px]" />
                  {previousItems.length - actionItems.length}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

export default DepartmentBoard;