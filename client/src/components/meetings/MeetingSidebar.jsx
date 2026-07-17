import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaHome,
  FaCalendarAlt,
  FaTasks,
  FaUsers,
  FaChartBar,
  FaCog,
  FaBolt,
  FaRobot,
  FaMagic,
  FaPlus,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaChevronDown,
  FaChevronUp,
  FaFolder,
  FaFolderOpen,
  FaStar,
  FaClock,
  FaCheckCircle,
  FaCircle,
  FaExclamationTriangle,
  FaFlag,
  FaTags,
  FaBookmark,
  FaLayerGroup
} from 'react-icons/fa';
import GlassCard from '../common/GlassCard';

const MeetingSidebar = ({ 
  collapsed, 
  onToggle, 
  meetingType,
  statusCounts,
  totalTasks,
  completedCount,
  inProgressCount
}) => {
  const [expandedSections, setExpandedSections] = useState({
    workspace: true,
    views: true,
    status: true,
    agents: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const statusConfig = {
    'in-progress': { label: 'In Progress', color: '#3B82F6', icon: FaCircle },
    'completed': { label: 'Done', color: '#10B981', icon: FaCheckCircle },
    'pending': { label: 'Pending', color: '#F59E0B', icon: FaClock },
    'stuck': { label: 'Stuck', color: '#EF4444', icon: FaExclamationTriangle },
    'hold': { label: 'Hold', color: '#6B7280', icon: FaCircle },
    'not-started': { label: 'Not Started', color: '#9CA3AF', icon: FaCircle }
  };

  const menuItems = [
    { icon: FaHome, label: 'Dashboard', path: '/admin' },
    { icon: FaUsers, label: 'Workers', path: '/admin/workers' },
    { icon: FaCalendarAlt, label: 'Meetings', path: '/admin/meetings', active: true },
    { icon: FaTasks, label: 'Tasks', path: '/admin/tasks' },
    { icon: FaChartBar, label: 'Reports', path: '/admin/reports' },
    { icon: FaCog, label: 'Settings', path: '/admin/settings' },
  ];

  const workspaceItems = [
    { icon: FaStar, label: 'F3 Meeting', active: true },
    { icon: FaBookmark, label: 'EXCO Meeting' },
    { icon: FaLayerGroup, label: 'All Workspaces' }
  ];

  const viewItems = [
    { icon: FaListUl, label: 'Main table', active: true },
    { icon: FaCalendarAlt, label: 'Calendar' },
    { icon: FaChartBar, label: 'Timeline' }
  ];

  const agentItems = [
    { icon: FaRobot, label: 'Sidekick', active: true },
    { icon: FaMagic, label: 'Vibe' },
    { icon: FaComments, label: 'Notetaker' },
    { icon: FaBolt, label: 'Workflows' }
  ];

  if (collapsed) {
    return (
      <div className="w-12 flex flex-col items-center gap-2">
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
        >
          <FaChevronRight className="text-sm" />
        </button>
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`p-2 rounded-lg transition-colors relative ${
              item.active 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
            title={item.label}
          >
            <item.icon className="text-sm" />
            {item.active && (
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-blue-500" />
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="w-56 flex-shrink-0">
      <GlassCard className="h-full flex flex-col p-3 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
              H
            </div>
            <span className="text-white font-medium text-xs">Hammedia</span>
          </div>
          <button
            onClick={onToggle}
            className="p-1 rounded hover:bg-white/5 text-white/60 hover:text-white transition-colors"
          >
            <FaChevronLeft className="text-xs" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">Admin User</p>
            <p className="text-gray-400 text-[10px] truncate">admin@hammedia.com</p>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <FaChevronDown className="text-xs" />
          </button>
        </div>

        {/* Upgrade Banner */}
        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 mb-3">
          <p className="text-blue-400 text-[10px] font-medium">7 days left on trial</p>
          <button className="mt-1 text-[10px] text-blue-400 hover:text-blue-300 transition-colors">
            Upgrade Now →
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-0.5 mb-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors text-xs ${
                item.active 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="text-xs" />
              <span>{item.label}</span>
              {item.active && (
                <div className="ml-auto w-1 h-4 rounded-full bg-blue-500" />
              )}
            </button>
          ))}
        </nav>

        {/* Workspace Section */}
        <div className="border-t border-gray-700/50 pt-3">
          <button 
            onClick={() => toggleSection('workspace')}
            className="w-full flex items-center justify-between text-gray-400 hover:text-white transition-colors text-xs mb-1"
          >
            <span className="font-medium">Workspace</span>
            {expandedSections.workspace ? <FaChevronDown className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />}
          </button>
          {expandedSections.workspace && (
            <div className="space-y-0.5">
              {workspaceItems.map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center gap-2 px-2 py-1 rounded-lg transition-colors text-xs ${
                    item.active 
                      ? 'bg-blue-500/10 text-blue-400' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="text-[10px]" />
                  <span>{item.label}</span>
                  {item.active && (
                    <span className="ml-auto text-[10px] text-gray-500">{totalTasks}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Views Section */}
        <div className="border-t border-gray-700/50 pt-3">
          <button 
            onClick={() => toggleSection('views')}
            className="w-full flex items-center justify-between text-gray-400 hover:text-white transition-colors text-xs mb-1"
          >
            <span className="font-medium">Views</span>
            {expandedSections.views ? <FaChevronDown className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />}
          </button>
          {expandedSections.views && (
            <div className="space-y-0.5">
              {viewItems.map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center gap-2 px-2 py-1 rounded-lg transition-colors text-xs ${
                    item.active 
                      ? 'bg-blue-500/10 text-blue-400' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="text-[10px]" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status Section */}
        <div className="border-t border-gray-700/50 pt-3">
          <button 
            onClick={() => toggleSection('status')}
            className="w-full flex items-center justify-between text-gray-400 hover:text-white transition-colors text-xs mb-1"
          >
            <span className="font-medium">Status</span>
            {expandedSections.status ? <FaChevronDown className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />}
          </button>
          {expandedSections.status && (
            <div className="space-y-0.5">
              {Object.entries(statusConfig).map(([key, config]) => (
                <div key={key} className="flex items-center justify-between px-2 py-1">
                  <div className="flex items-center gap-2">
                    <config.icon className="text-[10px]" style={{ color: config.color }} />
                    <span className="text-gray-400 text-xs">{config.label}</span>
                  </div>
                  <span className="text-gray-500 text-xs">{statusCounts[key] || 0}</span>
                </div>
              ))}
              <div className="flex items-center justify-between px-2 py-1 border-t border-gray-700/30">
                <span className="text-gray-500 text-xs">Total</span>
                <span className="text-gray-400 text-xs font-medium">{totalTasks}</span>
              </div>
            </div>
          )}
        </div>

        {/* Agents Section */}
        <div className="border-t border-gray-700/50 pt-3">
          <button 
            onClick={() => toggleSection('agents')}
            className="w-full flex items-center justify-between text-gray-400 hover:text-white transition-colors text-xs mb-1"
          >
            <span className="font-medium">Agents</span>
            {expandedSections.agents ? <FaChevronDown className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />}
          </button>
          {expandedSections.agents && (
            <div className="space-y-0.5">
              {agentItems.map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center gap-2 px-2 py-1 rounded-lg transition-colors text-xs ${
                    item.active 
                      ? 'bg-blue-500/10 text-blue-400' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="text-[10px]" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto pt-3 border-t border-gray-700/50">
          <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors text-xs">
            <FaUserCircle className="text-sm" />
            <span>Invite/1</span>
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default MeetingSidebar;