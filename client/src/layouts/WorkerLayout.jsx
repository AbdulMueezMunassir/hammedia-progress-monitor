import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaTasks, 
  FaCalendarAlt, 
  FaUser, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaUserCircle,
  FaMoon,
  FaSun,
  FaChartLine
} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';

const WorkerLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications] = useState([
    { id: 1, message: 'New task assigned: Website UI', time: '10 min ago' },
    { id: 2, message: 'Meeting reminder: Team Sync', time: '2 hours ago' },
  ]);

  const menuItems = [
    { icon: FaHome, label: 'Dashboard', path: '/worker' },
    { icon: FaTasks, label: 'My Tasks', path: '/worker/tasks' },
    { icon: FaCalendarAlt, label: 'Meetings', path: '/worker/meetings' },
    { icon: FaChartLine, label: 'My Progress', path: '/worker/progress' },
    { icon: FaUser, label: 'Profile', path: '/worker/profile' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-screen w-64 glass border-r border-white/10 z-50"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Hammedia</h1>
                <p className="text-white/40 text-xs">Worker Panel</p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <item.icon className="text-lg" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Bottom */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Navbar */}
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
                <div className="absolute right-0 mt-2 w-80 glass rounded-xl border border-white/10 shadow-xl overflow-hidden opacity-0 invisible hover:opacity-100 hover:visible transition-all duration-300">
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-white font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-4 hover:bg-white/5 transition-colors border-b border-white/5">
                        <p className="text-white text-sm">{notif.message}</p>
                        <p className="text-white/40 text-xs mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Profile */}
              <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
                <FaUserCircle className="text-2xl" />
                <span className="hidden md:inline">Worker</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default WorkerLayout;