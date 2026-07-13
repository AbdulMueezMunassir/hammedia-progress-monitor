import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaUsers, 
  FaCalendarAlt, 
  FaTasks, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaUserCircle,
  FaMoon,
  FaSun
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  console.log('AdminLayout rendering...', location.pathname); // Debug log

  const menuItems = [
    { icon: FaHome, label: 'Dashboard', path: '/admin' },
    { icon: FaUsers, label: 'Workers', path: '/admin/workers' },
    { icon: FaCalendarAlt, label: 'Meetings', path: '/admin/meetings' },
    { icon: FaTasks, label: 'Tasks', path: '/admin/tasks' },
    { icon: FaChartBar, label: 'Reports', path: '/admin/reports' },
    { icon: FaCog, label: 'Settings', path: '/admin/settings' },
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

  const getPageTitle = () => {
    const currentPath = location.pathname;
    const item = menuItems.find(item => item.path === currentPath);
    return item ? item.label : 'Dashboard';
  };

  return (
    <div className="min-h-screen gradient-bg flex">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-screen w-64 glass border-r border-white/10 z-50 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-white font-bold text-lg truncate">Hammedia</h1>
              <p className="text-white/40 text-xs truncate">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-white/10' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="text-lg flex-shrink-0" />
                <span className="font-medium truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            {darkMode ? <FaSun className="flex-shrink-0" /> : <FaMoon className="flex-shrink-0" />}
            <span className="truncate">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
          >
            <FaSignOutAlt className="flex-shrink-0" />
            <span className="truncate">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
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
              <div>
                <h2 className="text-white font-semibold">{getPageTitle()}</h2>
                <p className="text-white/40 text-xs hidden md:block">
                  Welcome back, {user?.name || 'Admin'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 relative"
              >
                <FaBell className="text-xl" />
              </button>

              {/* User Profile */}
              <button 
                onClick={() => navigate('/admin/settings')}
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <span className="hidden md:inline text-sm">{user?.name || 'Admin'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="text-white">
            {/* Debug output */}
            <div className="text-xs text-white/40 mb-4">Current path: {location.pathname}</div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;