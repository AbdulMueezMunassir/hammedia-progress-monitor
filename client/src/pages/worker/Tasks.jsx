import React, { useState } from 'react';

const WorkerTasks = () => {
  const [tasks] = useState([
    { id: 1, title: 'Complete UI Design', status: 'In Progress', deadline: '2024-07-20' },
    { id: 2, title: 'API Integration', status: 'Pending', deadline: '2024-07-25' },
    { id: 3, title: 'Testing', status: 'Completed', deadline: '2024-07-15' },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">My Tasks</h1>
      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">{task.title}</h3>
                <p className="text-white/60 text-sm">Deadline: {task.deadline}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                task.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                task.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerTasks;