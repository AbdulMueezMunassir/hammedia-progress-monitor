import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaBell, FaPalette, FaGlobe, FaSave } from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'security', label: 'Security', icon: FaLock },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'appearance', label: 'Appearance', icon: FaPalette },
    { id: 'general', label: 'General', icon: FaGlobe },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-white/60 mt-1">Manage your account and application settings</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <tab.icon />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <GlassCard>
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Profile Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white/80 block mb-2">Full Name</label>
                <input type="text" className="input-field" value="Admin User" />
              </div>
              <div>
                <label className="text-sm font-medium text-white/80 block mb-2">Email Address</label>
                <input type="email" className="input-field" value="admin@hammedia.com" />
              </div>
              <div>
                <label className="text-sm font-medium text-white/80 block mb-2">Department</label>
                <input type="text" className="input-field" value="Management" />
              </div>
              <div>
                <label className="text-sm font-medium text-white/80 block mb-2">Position</label>
                <input type="text" className="input-field" value="Administrator" />
              </div>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <FaSave />
              Save Changes
            </button>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Security Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white/80 block mb-2">Current Password</label>
                <input type="password" className="input-field" placeholder="Enter current password" />
              </div>
              <div>
                <label className="text-sm font-medium text-white/80 block mb-2">New Password</label>
                <input type="password" className="input-field" placeholder="Enter new password" />
              </div>
              <div>
                <label className="text-sm font-medium text-white/80 block mb-2">Confirm New Password</label>
                <input type="password" className="input-field" placeholder="Confirm new password" />
              </div>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <FaLock />
              Change Password
            </button>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
            <div className="space-y-4">
              {['Meeting Reminders', 'Task Assignments', 'Deadline Alerts', 'System Updates'].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-white">{item}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-white/20 peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Appearance Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white/80 block mb-2">Theme</label>
                <div className="flex gap-4">
                  <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">Dark</button>
                  <button className="px-4 py-2 rounded-xl bg-white/10 text-white/60 hover:text-white transition-colors">Light</button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-white/80 block mb-2">Accent Color</label>
                <div className="flex gap-4">
                  <button className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white"></button>
                  <button className="w-10 h-10 rounded-full bg-purple-600 border-2 border-transparent"></button>
                  <button className="w-10 h-10 rounded-full bg-green-600 border-2 border-transparent"></button>
                  <button className="w-10 h-10 rounded-full bg-pink-600 border-2 border-transparent"></button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'general' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">General Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <span className="text-white">Email Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-white/20 peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <span className="text-white">Auto Backup</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/20 peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default Settings;