import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaVideo, FaUsers, FaMapMarkerAlt, FaLink } from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';

const WorkerMeetings = () => {
  const [meetings] = useState([
    {
      id: 1,
      title: 'Weekly Team Sync',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: '1 hour',
      status: 'Upcoming',
      location: 'Meeting Room A',
      attendees: 12,
      agenda: 'Weekly progress review and planning'
    },
    {
      id: 2,
      title: 'Project Review',
      date: '2024-01-14',
      time: '2:00 PM',
      duration: '2 hours',
      status: 'Completed',
      location: 'Virtual',
      attendees: 8,
      agenda: 'Project milestone review'
    },
    {
      id: 3,
      title: 'Design Sprint',
      date: '2024-01-13',
      time: '9:30 AM',
      duration: '3 hours',
      status: 'Ongoing',
      location: 'Design Studio',
      attendees: 6,
      agenda: 'UI/UX design workshop'
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">My Meetings</h1>
        <p className="text-white/60 mt-1">View and join your scheduled meetings</p>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {meetings.map((meeting, index) => (
          <motion.div
            key={meeting.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <FaCalendarAlt className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{meeting.title}</h3>
                      <p className="text-white/60 text-sm mt-1">{meeting.agenda}</p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm">
                        <span className="flex items-center text-white/60">
                          <FaClock className="mr-1" />
                          {meeting.time} ({meeting.duration})
                        </span>
                        <span className="flex items-center text-white/60">
                          <FaUsers className="mr-1" />
                          {meeting.attendees} attendees
                        </span>
                        <span className="flex items-center text-white/60">
                          {meeting.location === 'Virtual' ? 
                            <FaVideo className="mr-1" /> : 
                            <FaMapMarkerAlt className="mr-1" />
                          }
                          {meeting.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    meeting.status === 'Upcoming' 
                      ? 'bg-blue-500/20 text-blue-400'
                      : meeting.status === 'Ongoing'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {meeting.status}
                  </span>
                  {meeting.status !== 'Completed' && (
                    <button className="btn-secondary flex items-center gap-2 py-2 px-4">
                      <FaVideo />
                      Join
                    </button>
                  )}
                  {meeting.location === 'Virtual' && (
                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
                      <FaLink />
                    </button>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkerMeetings;