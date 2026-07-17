import React from 'react';

const WorkerDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Worker Dashboard</h1>
      <p className="text-white/60">Welcome to your dashboard</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="glass-card p-6">
          <p className="text-white/60 text-sm">Assigned Tasks</p>
          <p className="text-2xl font-bold text-white">5</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-white/60 text-sm">Completed</p>
          <p className="text-2xl font-bold text-green-400">2</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-white/60 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">3</p>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;