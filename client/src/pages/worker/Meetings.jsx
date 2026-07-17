import React from 'react';

const WorkerMeetings = () => {
  const meetings = [
    { id: 1, title: 'Weekly Sync', date: '2024-07-20', time: '10:00 AM' },
    { id: 2, title: 'Project Review', date: '2024-07-22', time: '2:00 PM' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">My Meetings</h1>
      <div className="space-y-3">
        {meetings.map(meeting => (
          <div key={meeting.id} className="glass-card p-4">
            <h3 className="text-white font-medium">{meeting.title}</h3>
            <p className="text-white/60 text-sm">{meeting.date} at {meeting.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerMeetings;