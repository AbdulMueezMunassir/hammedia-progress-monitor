import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaLock, 
  FaBell, 
  FaPalette, 
  FaGlobe,
  FaSave,
  FaTimes,
  FaEdit,
  FaCamera,
  FaMoon,
  FaSun,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaIdCard,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle
} from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Profile form
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    employeeId: ''
  });

  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    taskAssignments: true,
    meetingReminders: true,
    deadlineAlerts: true,
    systemUpdates: true,
    marketingEmails: false
  });

  // Theme settings
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });

  // Load user data
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        department: user.department || '',
        position: user.position || '',
        employeeId: user.employeeId || ''
      });
    }
  }, [user]);

  // Apply theme
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'security', label: 'Security', icon: FaLock },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'appearance', label: 'Appearance', icon: FaPalette },
    { id: 'general', label: 'General', icon: FaGlobe }
  ];

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle notification toggle
  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Handle theme toggle
  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme} mode`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-white/40 text-sm">Manage your account and application settings</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 text-sm ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="text-sm" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <GlassCard>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-semibold">Profile Settings</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center gap-1"
                >
                  <FaEdit className="text-xs" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <form onSubmit={handleProfileUpdate}>
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                      {profileData.name?.charAt(0) || 'U'}
                    </div>
                    {isEditing && (
                      <button 
                        type="button"
                        className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      >
                        <FaCamera className="text-sm" />
                      </button>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{profileData.name || 'User'}</h4>
                    <p className="text-white/40 text-sm">{profileData.position || 'Position'}</p>
                    <p className="text-white/40 text-sm">{profileData.department || 'Department'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-sm block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isEditing 
                          ? 'bg-gray-700/50 border border-gray-600 text-white' 
                          : 'bg-gray-800/30 border border-transparent text-white/60 cursor-not-allowed'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm block mb-1">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      disabled
                      className="w-full px-3 py-2 bg-gray-800/30 border border-transparent rounded-lg text-white/40 text-sm cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm block mb-1">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isEditing 
                          ? 'bg-gray-700/50 border border-gray-600 text-white' 
                          : 'bg-gray-800/30 border border-transparent text-white/60 cursor-not-allowed'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm block mb-1">Department</label>
                    <input
                      type="text"
                      value={profileData.department}
                      onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isEditing 
                          ? 'bg-gray-700/50 border border-gray-600 text-white' 
                          : 'bg-gray-800/30 border border-transparent text-white/60 cursor-not-allowed'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm block mb-1">Position</label>
                    <input
                      type="text"
                      value={profileData.position}
                      onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isEditing 
                          ? 'bg-gray-700/50 border border-gray-600 text-white' 
                          : 'bg-gray-800/30 border border-transparent text-white/60 cursor-not-allowed'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm block mb-1">Employee ID</label>
                    <input
                      type="text"
                      value={profileData.employeeId}
                      disabled
                      className="w-full px-3 py-2 bg-gray-800/30 border border-transparent rounded-lg text-white/40 text-sm cursor-not-allowed"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-3 mt-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                    >
                      <FaSave />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        // Reset to original data
                        if (user) {
                          setProfileData({
                            name: user.name || '',
                            email: user.email || '',
                            phone: user.phone || '',
                            department: user.department || '',
                            position: user.position || '',
                            employeeId: user.employeeId || ''
                          });
                        }
                      }}
                      className="px-4 py-2 rounded-lg bg-gray-700 text-white/70 hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </GlassCard>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <GlassCard>
              <h3 className="text-white text-lg font-semibold mb-6">Security Settings</h3>
              
              <form onSubmit={handlePasswordChange}>
                <div className="space-y-4">
                  <div>
                    <label className="text-white/60 text-sm block mb-1">Current Password</label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter current password"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm block mb-1">New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter new password (min 6 characters)"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm block mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                  >
                    <FaLock />
                    {isLoading ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              </form>

              <div className="mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-400 text-sm font-medium">Password Requirements</p>
                    <ul className="text-yellow-400/70 text-xs mt-1 space-y-1">
                      <li>• Minimum 6 characters</li>
                      <li>• Include at least one uppercase letter</li>
                      <li>• Include at least one number</li>
                      <li>• Include at least one special character</li>
                    </ul>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <GlassCard>
              <h3 className="text-white text-lg font-semibold mb-6">Notification Preferences</h3>
              
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => {
                  const labels = {
                    emailNotifications: 'Email Notifications',
                    taskAssignments: 'Task Assignments',
                    meetingReminders: 'Meeting Reminders',
                    deadlineAlerts: 'Deadline Alerts',
                    systemUpdates: 'System Updates',
                    marketingEmails: 'Marketing Emails'
                  };
                  const descriptions = {
                    emailNotifications: 'Receive notifications via email',
                    taskAssignments: 'Get notified when tasks are assigned',
                    meetingReminders: 'Get reminders for upcoming meetings',
                    deadlineAlerts: 'Get alerts for approaching deadlines',
                    systemUpdates: 'Get notified about system updates',
                    marketingEmails: 'Receive marketing and promotional emails'
                  };

                  return (
                    <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div>
                        <p className="text-white text-sm font-medium">{labels[key]}</p>
                        <p className="text-white/40 text-xs">{descriptions[key]}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => toggleNotification(key)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6">
                <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all">
                  Save Preferences
                </button>
              </div>
            </GlassCard>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <GlassCard>
              <h3 className="text-white text-lg font-semibold mb-6">Appearance Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-white/60 text-sm block mb-3">Theme Mode</label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => toggleTheme('dark')}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                        theme === 'dark'
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <FaMoon className={theme === 'dark' ? 'text-blue-400' : 'text-white/40'} />
                        <span className={theme === 'dark' ? 'text-white' : 'text-white/60'}>Dark</span>
                      </div>
                    </button>
                    <button
                      onClick={() => toggleTheme('light')}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                        theme === 'light'
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <FaSun className={theme === 'light' ? 'text-blue-400' : 'text-white/40'} />
                        <span className={theme === 'light' ? 'text-white' : 'text-white/60'}>Light</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-sm block mb-3">Accent Color</label>
                  <div className="flex gap-3">
                    {['#3B82F6', '#8B5CF6', '#10B981', '#EF4444', '#F59E0B', '#EC4899'].map((color) => (
                      <button
                        key={color}
                        className="w-10 h-10 rounded-full border-2 border-gray-700 hover:border-white transition-all"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-sm block mb-3">Font Size</label>
                  <div className="flex gap-3">
                    {['Small', 'Medium', 'Large'].map((size) => (
                      <button
                        key={size}
                        className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {/* General Tab */}
          {activeTab === 'general' && (
            <GlassCard>
              <h3 className="text-white text-lg font-semibold mb-6">General Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div>
                    <p className="text-white text-sm font-medium">Language</p>
                    <p className="text-white/40 text-xs">Select your preferred language</p>
                  </div>
                  <select className="px-3 py-1.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                    <option value="fr">French</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div>
                    <p className="text-white text-sm font-medium">Timezone</p>
                    <p className="text-white/40 text-xs">Select your timezone</p>
                  </div>
                  <select className="px-3 py-1.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="UTC">UTC</option>
                    <option value="Asia/Dubai">Asia/Dubai (UTC+4)</option>
                    <option value="Asia/Colombo">Asia/Colombo (UTC+5:30)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div>
                    <p className="text-white text-sm font-medium">Date Format</p>
                    <p className="text-white/40 text-xs">Select your date format</p>
                  </div>
                  <select className="px-3 py-1.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all">
                  Save General Settings
                </button>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-3">
                  <FaExclamationTriangle className="text-red-400 mt-0.5" />
                  <div>
                    <p className="text-red-400 text-sm font-medium">Danger Zone</p>
                    <p className="text-red-400/70 text-xs mt-1">This action cannot be undone.</p>
                    <button className="mt-2 px-4 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Settings;