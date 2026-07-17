import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCopy, 
  FaDownload, 
  FaArchive, 
  FaTrash, 
  FaMove,
  FaShareAlt,
  FaTags,
  FaClock,
  FaFlag,
  FaUserPlus,
  FaComments,
  FaPaperclip,
  FaTimes
} from 'react-icons/fa';
import GlassCard from '../common/GlassCard';

const TaskActionBar = ({ 
  selectedCount, 
  onDuplicate, 
  onArchive, 
  onDelete, 
  onExport, 
  onMove 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="border-t border-gray-700/50 p-2 bg-gray-800/50"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-xs">
            {selectedCount} task{selectedCount > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-0.5">
            <button 
              onClick={onDuplicate}
              className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Duplicate"
            >
              <FaCopy className="text-xs" />
            </button>
            <button 
              onClick={onExport}
              className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Export"
            >
              <FaDownload className="text-xs" />
            </button>
            <button 
              onClick={onArchive}
              className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Archive"
            >
              <FaArchive className="text-xs" />
            </button>
            <button 
              onClick={onDelete}
              className="p-1.5 rounded hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
              title="Delete"
            >
              <FaTrash className="text-xs" />
            </button>
            <button 
              onClick={onMove}
              className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Move"
            >
              <FaMove className="text-xs" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          <button className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Add tags">
            <FaTags className="text-xs" />
          </button>
          <button className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Set due date">
            <FaClock className="text-xs" />
          </button>
          <button className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Set priority">
            <FaFlag className="text-xs" />
          </button>
          <button className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Assign">
            <FaUserPlus className="text-xs" />
          </button>
          <button className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Add comment">
            <FaComments className="text-xs" />
          </button>
          <button className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Attach file">
            <FaPaperclip className="text-xs" />
          </button>
          <button className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Share">
            <FaShareAlt className="text-xs" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskActionBar;