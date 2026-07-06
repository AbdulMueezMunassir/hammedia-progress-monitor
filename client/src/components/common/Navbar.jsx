import React, { useState } from 'react';
import { FaBars, FaTimes, FaBell, FaUserCircle } from 'react-icons/fa';

const Navbar = ({ sidebarOpen, toggleSidebar }) => {
  const [notifications] = useState([
    { id: 1, message: 'New worker registered', time: '5 min ago' },
    { id: 2, message: 'Meeting scheduled for tomorrow', time: '1 hour ago' },
  ]);

  return (
    <header className="glass border-b border-white/10 p-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h2 className="text-white font-semibold">Dashboard</h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 relative">
              <FaBell className="text-xl" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
          </div>

          {/* Profile */}
          <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
            <FaUserCircle className="text-2xl" />
            <span className="hidden md:inline">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;