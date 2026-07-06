import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaSearch, FaCalendarAlt, FaClock, FaVideo, FaUsers } from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';

const Meetings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const meetings = [
    { id: 1, title: 'Weekly Team Sync', date: '2024-01-15', time: '10:00 AM', attendees: 12, status: 'Upcoming' },
    { id: 2, title: 'Project Review', date: '2024-01-14', time: '2:00 PM', attendees: 8, status: 'Completed' },
    { id: 3, title: 'Design Sprint', date: '2024-01-13', time: '9:30 AM', attendees: 6, status: 'Ongoing' },
    { id: 4, title: 'Client Meeting', date: '2024-01-16', time: '11:00 AM', attendees: 4, status: 'Upcoming' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Meetings</h1>
          <p className="text-white/60 mt-1">Schedule and manage meetings</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus />
          Create Meeting
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search meetings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select className="input-field md:w-48">
          <option value="">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Meetings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {meetings.map((meeting, index) => (
          <motion.div
            key={meeting.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard className="hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">{meeting.title}</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-white/60 text-sm">
                      <FaCalendarAlt className="mr-2" />
                      {meeting.date}
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <FaClock className="mr-2" />
                      {meeting.time}
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <FaUsers className="mr-2" />
                      {meeting.attendees} attendees
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    meeting.status === 'Upcoming' 
                      ? 'bg-blue-500/20 text-blue-400'
                      : meeting.status === 'Ongoing'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {meeting.status}
                  </span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    <FaVideo className="inline mr-1" />
                    Join
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Meetings;