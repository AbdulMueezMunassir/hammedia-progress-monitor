import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaIdCard, FaCamera, FaSave } from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';

const WorkerProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Ahmed Ali',
    email: 'ahmed@hammedia.com',
    phone: '+971 50 123 4567',
    department: 'Design',
    position: 'UI/UX Designer',
    employeeId: 'EMP-001',
    joinDate: '2023-06-15'
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">My Profile</h1>
        <p className="text-white/60 mt-1">View and manage your profile information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Photo */}
        <GlassCard>
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                {profile.name.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <FaCamera />
              </button>
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
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-white/80 block mb-2">
                <FaUser className="inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                className="input-field"
                value={profile.name}
                disabled={!isEditing}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white/80 block mb-2">
                <FaEnvelope className="inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                className="input-field"
                value={profile.email}
                disabled
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white/80 block mb-2">
                <FaPhone className="inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                className="input-field"
                value={profile.phone}
                disabled={!isEditing}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white/80 block mb-2">
                <FaBuilding className="inline mr-2" />
                Department
              </label>
              <input
                type="text"
                className="input-field"
                value={profile.department}
                disabled={!isEditing}
                onChange={(e) => setProfile({...profile, department: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white/80 block mb-2">
                Position
              </label>
              <input
                type="text"
                className="input-field"
                value={profile.position}
                disabled={!isEditing}
                onChange={(e) => setProfile({...profile, position: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white/80 block mb-2">
                <FaIdCard className="inline mr-2" />
                Employee ID
              </label>
              <input
                type="text"
                className="input-field"
                value={profile.employeeId}
                disabled
              />
            </div>
          </div>

          {isEditing && (
            <div className="mt-6">
              <button className="btn-primary flex items-center gap-2">
                <FaSave />
                Save Changes
              </button>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default WorkerProfile;