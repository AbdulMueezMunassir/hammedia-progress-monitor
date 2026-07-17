import React, { useState } from 'react';
import { FaExchangeAlt, FaInfoCircle } from 'react-icons/fa';
import MeetingWorkspace from '../../components/meetings/MeetingWorkspace';

const Meetings = () => {
  const [activeMeeting, setActiveMeeting] = useState('F3');

  return (
    <div className="space-y-4">
      {/* Meeting Type Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex rounded-lg bg-white/5 p-1">
            <button
              onClick={() => setActiveMeeting('F3')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeMeeting === 'F3' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              F3 Meeting
            </button>
            <button
              onClick={() => setActiveMeeting('EXCO')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeMeeting === 'EXCO' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              EXCO Meeting
            </button>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <FaExchangeAlt />
            <span>Escalation: F3 ↔ EXCO</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-white/30 text-xs">
          <FaInfoCircle />
          <span>Double-click to edit | Click + on task for subitems</span>
        </div>
      </div>

      {/* Meeting Workspace */}
      <MeetingWorkspace meetingType={activeMeeting} />
    </div>
  );
};

export default Meetings;