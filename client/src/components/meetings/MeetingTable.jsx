import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlusCircle, 
  FaMinusCircle, 
  FaCopy, 
  FaTrash, 
  FaEllipsisV,
  FaArrowUp,
  FaPlay,
  FaStop,
  FaPause,
  FaClock,
  FaCheckCircle,
  FaCircle
} from 'react-icons/fa';

const MeetingTable = ({ 
  tasks, 
  selectedTasks, 
  expandedTasks, 
  onToggleTask, 
  onToggleSelection, 
  onSelectAll,
  onStatusChange,
  onSubtaskStatusChange,
  onAddSubtask,
  onDuplicate,
  onDelete,
  onEscalate
}) => {
  const STATUS_CONFIG = {
    'in-progress': { label: 'In Progress', color: '#3B82F6' },
    'completed': { label: 'Done', color: '#10B981' },
    'pending': { label: 'Pending', color: '#F59E0B' },
    'stuck': { label: 'Stuck', color: '#EF4444' },
    'hold': { label: 'Hold', color: '#6B7280' },
    'not-started': { label: 'Not Started', color: '#9CA3AF' }
  };

  const PRIORITY_CONFIG = {
    'high': { label: 'High', color: '#EF4444' },
    'medium': { label: 'Medium', color: '#F59E0B' },
    'low': { label: 'Low', color: '#10B981' }
  };

  // Group tasks by status
  const groupedTasks = {};
  Object.keys(STATUS_CONFIG).forEach(status => {
    groupedTasks[status] = tasks.filter(t => t.status === status);
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead className="sticky top-0 bg-[#0f172a] z-10">
          <tr className="border-b border-gray-700/50">
            <th className="py-2 px-2 w-6">
              <input
                type="checkbox"
                checked={selectedTasks.length === tasks.length && tasks.length > 0}
                onChange={onSelectAll}
                className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
              />
            </th>
            <th className="text-left py-2 px-2 text-gray-400 font-medium">Task</th>
            <th className="text-left py-2 px-2 text-gray-400 font-medium">Owner</th>
            <th className="text-left py-2 px-2 text-gray-400 font-medium">Status</th>
            <th className="text-left py-2 px-2 text-gray-400 font-medium">Due date</th>
            <th className="text-left py-2 px-2 text-gray-400 font-medium">Priority</th>
            <th className="text-left py-2 px-2 text-gray-400 font-medium">Last updated</th>
            <th className="text-left py-2 px-2 text-gray-400 font-medium">Text</th>
            <th className="text-left py-2 px-2 text-gray-400 font-medium">Escalate to...</th>
            <th className="text-left py-2 px-2 text-gray-400 font-medium w-16">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedTasks).map(([statusKey, statusTasks]) => {
            if (statusTasks.length === 0) return null;
            const config = STATUS_CONFIG[statusKey];
            
            return (
              <React.Fragment key={statusKey}>
                {/* Status Group Header */}
                <tr className="bg-gray-800/30">
                  <td colSpan="10" className="py-1.5 px-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: config.color }} />
                      <span className="text-gray-300 font-medium text-xs">{config.label}</span>
                      <span className="text-gray-500 text-xs">({statusTasks.length})</span>
                    </div>
                  </td>
                </tr>

                {/* Task Rows */}
                {statusTasks.map((task) => {
                  const isExpanded = expandedTasks[task.id] || false;
                  const isSelected = selectedTasks.includes(task.id);
                  const hasSubtasks = task.subtasks && task.subtasks.length > 0;

                  return (
                    <React.Fragment key={task.id}>
                      <tr 
                        className={`border-b border-gray-700/30 hover:bg-white/5 transition-colors ${
                          isSelected ? 'bg-blue-500/5' : ''
                        }`}
                      >
                        <td className="py-2 px-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => onToggleSelection(task.id)}
                            className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center gap-1.5">
                            {hasSubtasks && (
                              <button
                                onClick={() => onToggleTask(task.id)}
                                className="text-gray-500 hover:text-gray-300 transition-colors"
                              >
                                {isExpanded ? <FaMinusCircle className="text-[10px]" /> : <FaPlusCircle className="text-[10px]" />}
                              </button>
                            )}
                            <span className="text-white font-medium">{task.title}</span>
                            {task.escalatedTo && (
                              <span className="px-1 py-0.5 rounded text-[8px] bg-purple-500/20 text-purple-400">
                                → {task.escalatedTo}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-[8px] font-bold">
                              {task.owner.charAt(0)}
                            </div>
                            <span className="text-gray-300">{task.owner}</span>
                          </div>
                        </td>
                        <td className="py-2 px-2">
                          <select
                            value={task.status}
                            onChange={(e) => onStatusChange(task.id, e.target.value)}
                            className="bg-gray-800 text-white text-[10px] rounded px-1.5 py-0.5 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[80px]"
                            style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                          >
                            {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                              <option key={key} value={key} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                                {val.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-2 px-2 text-gray-300 text-[10px]">
                          {task.dueDate}
                        </td>
                        <td className="py-2 px-2">
                          <span 
                            className="px-1.5 py-0.5 rounded-full text-[9px] font-medium"
                            style={{ 
                              color: PRIORITY_CONFIG[task.priority]?.color || '#9CA3AF',
                              backgroundColor: `${PRIORITY_CONFIG[task.priority]?.color || '#6B7280'}22`
                            }}
                          >
                            {PRIORITY_CONFIG[task.priority]?.label || task.priority}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-gray-400 text-[10px]">
                          {task.lastUpdated}
                        </td>
                        <td className="py-2 px-2 text-gray-400 text-[10px] max-w-[80px] truncate">
                          {task.description}
                        </td>
                        <td className="py-2 px-2">
                          {!task.escalatedTo ? (
                            <button 
                              onClick={() => onEscalate(task.id)}
                              className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors text-[9px] flex items-center gap-0.5"
                            >
                              <FaArrowUp className="text-[8px]" />
                              Escalate
                            </button>
                          ) : (
                            <span className="text-purple-400 text-[9px] font-medium">
                              ✓ Escalated
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center gap-0.5">
                            <button 
                              onClick={() => onDuplicate(task.id)}
                              className="p-0.5 rounded hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                              title="Duplicate"
                            >
                              <FaCopy className="text-[10px]" />
                            </button>
                            <button 
                              onClick={() => onDelete(task.id)}
                              className="p-0.5 rounded hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <FaTrash className="text-[10px]" />
                            </button>
                            <button className="p-0.5 rounded hover:bg-white/10 text-gray-500 hover:text-white transition-colors">
                              <FaEllipsisV className="text-[10px]" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Subtasks */}
                      {isExpanded && hasSubtasks && task.subtasks.map((subtask) => (
                        <tr key={subtask.id} className="bg-gray-800/20 border-b border-gray-700/20">
                          <td className="py-1.5 px-2" />
                          <td className="py-1.5 px-2" colSpan="9">
                            <div className="flex items-center gap-2 pl-4">
                              <div className="flex items-center gap-1.5 flex-1">
                                <span className="text-gray-400 text-[10px]">•</span>
                                <span className="text-gray-300 text-[10px]">{subtask.title}</span>
                              </div>
                              <span className="text-gray-500 text-[10px]">{subtask.owner}</span>
                              <span className="text-gray-500 text-[10px]">{subtask.dueDate}</span>
                              <select
                                value={subtask.status}
                                onChange={(e) => onSubtaskStatusChange(task.id, subtask.id, e.target.value)}
                                className="bg-gray-800 text-white text-[9px] rounded px-1.5 py-0.5 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[70px]"
                                style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                              >
                                {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                                  <option key={key} value={key} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                                    {val.label}
                                  </option>
                                ))}
                              </select>
                              <button className="text-gray-500 hover:text-white transition-colors">
                                <FaEllipsisV className="text-[8px]" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {/* Add Subitem Button */}
                      {isExpanded && (
                        <tr className="bg-gray-800/10">
                          <td className="py-1.5 px-2" />
                          <td colSpan="9" className="py-1.5 px-2">
                            <button 
                              onClick={() => onAddSubtask(task.id)}
                              className="text-gray-500 hover:text-gray-300 transition-colors text-[10px] flex items-center gap-1 pl-4"
                            >
                              <FaPlusCircle className="text-[10px]" />
                              Add subitem
                            </button>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingTable;