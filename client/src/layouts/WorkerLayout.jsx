import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaTasks, 
  FaCalendarAlt, 
  FaUser, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaMoon,
  FaSun
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';

const WorkerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const menuItems = [
    { icon: FaHome, label: 'Dashboard', path: '/worker' },
    { icon: FaTasks, label: 'My Tasks', path: '/worker/tasks' },
    { icon: FaCalendarAlt, label: 'Meetings', path: '/worker/meetings' },
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

  return (
    <div className="min-h-screen gradient-bg flex">
      <div className={`fixed top-0 left-0 h-screen w-64 glass border-r border-white/10 z-50 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
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
                <item.icon className="text-lg" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-400" />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
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

      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="glass border-b border-white/10 p-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              >
                {sidebarOpen ? <FaTimes /> : <FaBars />}
              </button>
              <h2 className="text-white font-semibold">Worker Dashboard</h2>
            </div>
            <div className="flex items-center space-x-3">
              <button className="text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
                <FaBell className="text-xl" />
              </button>
              <button
                onClick={toggleDarkMode}
                className="text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              >
                {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
              </button>
              <div className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.charAt(0) || 'W'}
                </div>
                <span className="hidden md:inline text-sm">{user?.name || 'Worker'}</span>
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default WorkerLayout;