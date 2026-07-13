import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExchangeAlt } from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import MeetingBoard from '../../components/meetings/MeetingBoard';

const Meetings = () => {
  const [activeMeeting, setActiveMeeting] = useState('F3');

  return (
    <div className="space-y-6">
      {/* Meeting Type Toggle */}
      <div className="flex items-center gap-4">
        <div className="flex rounded-lg bg-white/5 p-1">
          <button
            onClick={() => setActiveMeeting('F3')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              activeMeeting === 'F3' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            F3 Meeting
          </button>
          <button
            onClick={() => setActiveMeeting('EXCO')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              activeMeeting === 'EXCO' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            EXCO Meeting
          </button>
        </div>
        <div className="flex items-center gap-2 text-white/40 text-sm">
          <FaExchangeAlt />
          <span>Escalation: F3 ↔ EXCO</span>
        </div>
      </div>

      {/* Meeting Board */}
      <MeetingBoard 
        meetingType={activeMeeting}
        meetingData={{}}
      />

      {/* Escalation Info */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-white/60 text-sm">
              {activeMeeting === 'F3' 
                ? 'Tasks can be escalated to EXCO meeting for executive review' 
                : 'Tasks can be escalated to F3 meeting for operational review'}
            </span>
          </div>
          <span className="text-purple-400 text-xs font-medium">
            Escalation enabled
          </span>
        </div>
      </GlassCard>
    </div>
  );
};

export default Meetings;