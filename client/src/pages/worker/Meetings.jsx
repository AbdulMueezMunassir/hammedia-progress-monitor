import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUsers, 
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const WorkerMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const savedMeetings = localStorage.getItem('workerMeetings');
    if (savedMeetings) {
      setMeetings(JSON.parse(savedMeetings));
    } else {
      const sampleMeetings = [
        {
          id: 1,
          title: 'Weekly Team Sync',
          type: 'F3',
          date: '2024-07-25',
          time: '10:00 AM',
          duration: '1 hour',
          status: 'upcoming',
          location: 'Meeting Room A',
          attendees: 12,
          agenda: 'Weekly progress review and planning',
          attendanceStatus: 'not-marked'
        },
        {
          id: 2,
          title: 'Project Review',
          type: 'EXCO',
          date: '2024-07-22',
          time: '2:00 PM',
          duration: '2 hours',
          status: 'completed',
          location: 'Virtual',
          attendees: 8,
          agenda: 'Project milestone review',
          attendanceStatus: 'present'
        },
        {
          id: 3,
          title: 'Design Sprint',
          type: 'F3',
          date: '2024-07-20',
          time: '9:30 AM',
          duration: '3 hours',
          status: 'completed',
          location: 'Design Studio',
          attendees: 6,
          agenda: 'UI/UX design workshop',
          attendanceStatus: 'absent'
        },
        {
          id: 4,
          title: 'Q3 Planning',
          type: 'EXCO',
          date: '2024-07-28',
          time: '11:00 AM',
          duration: '2 hours',
          status: 'upcoming',
          location: 'Virtual',
          attendees: 10,
          agenda: 'Quarterly planning session',
          attendanceStatus: 'not-marked'
        }
      ];
      setMeetings(sampleMeetings);
      localStorage.setItem('workerMeetings', JSON.stringify(sampleMeetings));
    }
    setLoading(false);
  }, []);

  const markAttendance = (meetingId, status) => {
    setMeetings(prev => prev.map(meeting => {
      if (meeting.id === meetingId) {
        return { ...meeting, attendanceStatus: status };
      }
      return meeting;
    }));
    toast.success(`Attendance marked as ${status}`);
  };

  const filteredMeetings = meetings.filter(meeting => {
    return filterStatus === 'all' || meeting.status === filterStatus;
  });

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">My Meetings</h1>
        <p className="text-white/40 text-sm">View your scheduled meetings</p>
        <p className="text-white/30 text-xs mt-1">{format(new Date(), 'EEEE, MMMM d, yyyy • h:mm a')}</p>
      </div>

      {/* Filter */}
      <GlassCard className="p-4">
        <div className="flex items-center gap-3">
          <span className="text-white/60 text-sm">Filter:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Meetings</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </GlassCard>

      {/* Meetings List */}
      <div className="space-y-4">
        {filteredMeetings.map((meeting, index) => (
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
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-semibold text-lg">{meeting.title}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          meeting.type === 'F3' 
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {meeting.type}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm mt-1">{meeting.agenda}</p>
                      <div className="flex flex-wrap gap-4 mt-2 text-xs">
                        <span className="flex items-center text-white/60">
                          <FaClock className="mr-1" />
                          {meeting.time} ({meeting.duration})
                        </span>
                        <span className="flex items-center text-white/60">
                          <FaUsers className="mr-1" />
                          {meeting.attendees} attendees
                        </span>
                        <span className="flex items-center text-white/60">
                          <FaMapMarkerAlt className="mr-1" />
                          {meeting.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    meeting.status === 'upcoming' 
                      ? 'bg-blue-500/20 text-blue-400'
                      : meeting.status === 'completed'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {meeting.status}
                  </span>
                  
                  {/* Attendance Status */}
                  {meeting.status === 'completed' && (
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      meeting.attendanceStatus === 'present' 
                        ? 'bg-green-500/20 text-green-400'
                        : meeting.attendanceStatus === 'absent'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {meeting.attendanceStatus === 'present' ? '✓ Present' :
                       meeting.attendanceStatus === 'absent' ? '✗ Absent' :
                       'Not Marked'}
                    </span>
                  )}

                  {/* Mark Attendance - Only for upcoming/completed meetings not marked */}
                  {meeting.status !== 'upcoming' && meeting.attendanceStatus === 'not-marked' && (
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => markAttendance(meeting.id, 'present')}
                        className="px-2 py-1 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors text-xs flex items-center gap-1"
                      >
                        <FaCheckCircle className="text-[10px]" />
                        Present
                      </button>
                      <button 
                        onClick={() => markAttendance(meeting.id, 'absent')}
                        className="px-2 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-xs flex items-center gap-1"
                      >
                        <FaTimesCircle className="text-[10px]" />
                        Absent
                      </button>
                    </div>
                  )}
                  {/* Removed Join and Link buttons */}
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