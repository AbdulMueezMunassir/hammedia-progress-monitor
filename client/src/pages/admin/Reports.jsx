import React from 'react';

const Reports = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Reports</h1>
      <p className="text-white/60">Generate and export reports</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-6">
          <h3 className="text-white font-medium">Task Report</h3>
          <p className="text-white/60 text-sm">View task completion report</p>
          <button className="mt-3 btn-primary text-sm py-2 px-4">Generate</button>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-white font-medium">Meeting Report</h3>
          <p className="text-white/60 text-sm">View meeting attendance report</p>
          <button className="mt-3 btn-primary text-sm py-2 px-4">Generate</button>
        </div>
      </div>
    </div>
  );
};

export default Reports;