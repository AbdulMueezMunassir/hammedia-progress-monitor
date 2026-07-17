import React, { useState } from 'react';

const WorkerProfile = () => {
  const [profile] = useState({
    name: 'Ahmed Ali',
    email: 'ahmed@hammedia.com',
    department: 'Design',
    position: 'UI/UX Designer'
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">My Profile</h1>
      <div className="glass-card p-6 max-w-md">
        <div className="space-y-3">
          <div>
            <p className="text-white/60 text-sm">Name</p>
            <p className="text-white">{profile.name}</p>
          </div>
          <div>
            <p className="text-white/60 text-sm">Email</p>
            <p className="text-white">{profile.email}</p>
          </div>
          <div>
            <p className="text-white/60 text-sm">Department</p>
            <p className="text-white">{profile.department}</p>
          </div>
          <div>
            <p className="text-white/60 text-sm">Position</p>
            <p className="text-white">{profile.position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;