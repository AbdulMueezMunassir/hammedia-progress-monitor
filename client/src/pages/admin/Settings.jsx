import React from 'react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>
      <p className="text-white/60">Manage your settings</p>
      
      <div className="glass-card p-6 max-w-md">
        <div className="space-y-4">
          <div>
            <label className="text-white/60 text-sm block mb-1">Theme</label>
            <select className="input-field">
              <option>Dark</option>
              <option>Light</option>
            </select>
          </div>
          <div>
            <label className="text-white/60 text-sm block mb-1">Notifications</label>
            <select className="input-field">
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </div>
          <button className="btn-primary w-full">Save Settings</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;