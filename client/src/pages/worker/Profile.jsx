import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaBuilding, 
  FaIdCard, 
  FaCamera, 
  FaSave,
  FaEdit,
  FaTimes,
  FaLock,
  FaKey
} from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const WorkerProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Load profile from localStorage or use user data
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('workerProfile');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      name: user?.name || 'Worker',
      email: user?.email || 'worker@hammedia.com',
      phone: user?.phone || '+971 50 123 4567',
      department: user?.department || 'Design',
      position: user?.position || 'UI/UX Designer',
      employeeId: user?.employeeId || 'EMP-001',
      joinDate: '2024-06-15'
    };
  });

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('workerProfile', JSON.stringify(profile));
  }, [profile]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Save to localStorage
      localStorage.setItem('workerProfile', JSON.stringify(profile));
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

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
      // In real app, this would call the API
      toast.success('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordModal(false);
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">My Profile</h1>
        <p className="text-white/40 text-sm">View and manage your profile information</p>
        <p className="text-white/30 text-xs mt-1">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Photo */}
        <GlassCard>
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                {profile.name.charAt(0)}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  <FaCamera />
                </button>
              )}
            </div>
            <h3 className="text-white font-semibold text-xl mt-4">{profile.name}</h3>
            <p className="text-white/60">{profile.position}</p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">Active</span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">Online</span>
            </div>
          </div>
        </GlassCard>

        {/* Profile Details */}
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Profile Information</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-1 text-sm"
              >
                <FaKey />
                Change Password
              </button>
              <button
                onClick={() => {
                  if (isEditing) {
                    setIsEditing(false);
                  } else {
                    setIsEditing(true);
                  }
                }}
                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 text-sm"
              >
                {isEditing ? <FaTimes /> : <FaEdit />}
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white/60 text-sm block mb-1">
                <FaUser className="inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isEditing 
                    ? 'bg-gray-700/50 border border-gray-600 text-white' 
                    : 'bg-gray-800/30 border border-transparent text-white/60 cursor-not-allowed'
                }`}
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="text-white/60 text-sm block mb-1">
                <FaEnvelope className="inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 bg-gray-800/30 border border-transparent rounded-lg text-white/40 text-sm cursor-not-allowed"
                value={profile.email}
                disabled
              />
            </div>
            <div>
              <label className="text-white/60 text-sm block mb-1">
                <FaPhone className="inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isEditing 
                    ? 'bg-gray-700/50 border border-gray-600 text-white' 
                    : 'bg-gray-800/30 border border-transparent text-white/60 cursor-not-allowed'
                }`}
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="text-white/60 text-sm block mb-1">
                <FaBuilding className="inline mr-2" />
                Department
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isEditing 
                    ? 'bg-gray-700/50 border border-gray-600 text-white' 
                    : 'bg-gray-800/30 border border-transparent text-white/60 cursor-not-allowed'
                }`}
                value={profile.department}
                onChange={(e) => setProfile({...profile, department: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="text-white/60 text-sm block mb-1">
                Position
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isEditing 
                    ? 'bg-gray-700/50 border border-gray-600 text-white' 
                    : 'bg-gray-800/30 border border-transparent text-white/60 cursor-not-allowed'
                }`}
                value={profile.position}
                onChange={(e) => setProfile({...profile, position: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="text-white/60 text-sm block mb-1">
                <FaIdCard className="inline mr-2" />
                Employee ID
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-gray-800/30 border border-transparent rounded-lg text-white/40 text-sm cursor-not-allowed"
                value={profile.employeeId}
                disabled
              />
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
              >
                <FaSave />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-white/40 text-sm">Joined: {profile.joinDate}</p>
          </div>
        </GlassCard>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                <FaLock className="text-yellow-400" />
                Change Password
              </h3>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                }}
                className="text-white/40 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handlePasswordChange}>
              <div className="space-y-3">
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
                    placeholder="Min 6 characters"
                    required
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm block mb-1">Confirm Password</label>
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
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                  }}
                  className="flex-1 py-2 rounded-lg bg-gray-700 text-white/70 hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-2 rounded-lg bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:from-yellow-700 hover:to-orange-700 transition-all"
                >
                  {isLoading ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerProfile;