import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { login } from '../../redux/slices/authSlice';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaMoon, FaSun } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Dark mode state - loaded from localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Apply theme to body - FIXED
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
    // Force re-render by updating body style directly
    document.body.style.backgroundColor = isDarkMode ? '#0f172a' : '#f1f5f9';
    document.body.style.color = isDarkMode ? '#f1f5f9' : '#0f172a';
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await dispatch(login(formData)).unwrap();
      toast.success(`Welcome back, ${result.user.name}!`);
      
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else if (result.user.role === 'worker') {
        navigate('/worker');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative ${
      isDarkMode ? 'gradient-bg' : 'bg-gray-100'
    }`}>
      {/* Theme Toggle */}
      <button
        onClick={toggleDarkMode}
        className={`absolute top-4 right-4 z-20 p-2.5 rounded-xl transition-all duration-300 ${
          isDarkMode 
            ? 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20' 
            : 'bg-gray-200/80 text-gray-700 hover:text-gray-900 hover:bg-gray-300/80'
        }`}
      >
        {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
      </button>

      {/* Background Effects - Only in dark mode */}
      {isDarkMode && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className={`rounded-2xl p-8 transition-all duration-300 ${
          isDarkMode 
            ? 'glass-card' 
            : 'bg-white shadow-xl border border-gray-200'
        }`}>
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center"
            >
              <span className="text-3xl font-bold text-white">H</span>
            </motion.div>
            <h1 className={`text-3xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'gradient-text' : 'text-gray-800'
            }`}>
              Hammedia
            </h1>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? 'text-white/60' : 'text-gray-500'
            }`}>
              Meeting & Task Progress Monitoring
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`text-sm font-medium block mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white/80' : 'text-gray-700'
              }`}>
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                  isDarkMode ? 'text-white/40' : 'text-gray-400'
                }`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-white/5 border border-white/10 text-white placeholder-white/50' 
                      : 'bg-gray-100 border border-gray-200 text-gray-800 placeholder-gray-400'
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <label className={`text-sm font-medium block mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white/80' : 'text-gray-700'
              }`}>
                Password
              </label>
              <div className="relative">
                <FaLock className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                  isDarkMode ? 'text-white/40' : 'text-gray-400'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-white/5 border border-white/10 text-white placeholder-white/50' 
                      : 'bg-gray-100 border border-gray-200 text-gray-800 placeholder-gray-400'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                    isDarkMode ? 'text-white/40 hover:text-white/60' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link
                to="/forgot-password"
                className={isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Logging in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className={`mt-6 text-center text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-white/40' : 'text-gray-400'
          }`}>
            <p>Secure login powered by JWT authentication</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;