import React from 'react';

const StatusBadge = ({ status, label }) => {
  const colors = {
    'not-started': 'bg-gray-500/20 text-gray-400',
    'on-going': 'bg-yellow-500/20 text-yellow-400',
    'stuck': 'bg-red-500/20 text-red-400',
    'hold': 'bg-orange-500/20 text-orange-400',
    'complete': 'bg-green-500/20 text-green-400',
    'dropped': 'bg-gray-500/20 text-gray-400',
  };

  const labels = {
    'not-started': 'Not Started',
    'on-going': 'On Going',
    'stuck': 'Stuck',
    'hold': 'Hold',
    'complete': 'Complete',
    'dropped': 'Dropped',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || colors['not-started']}`}>
      {label || labels[status] || status}
    </span>
  );
};

export default StatusBadge;