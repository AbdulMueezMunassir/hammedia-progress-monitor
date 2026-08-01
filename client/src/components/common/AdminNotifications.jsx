import React, { useState, useEffect } from 'react';
import { FaBell, FaTimes, FaCheckCircle, FaComment, FaPaperclip, FaPlay, FaPause, FaTrash, FaCheckDouble } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadNotifications();
    // Check for new notifications every 3 seconds
    const interval = setInterval(loadNotifications, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = () => {
    const saved = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    setNotifications(saved);
    setUnreadCount(saved.filter(n => !n.read).length);
  };

  const markAsRead = (id) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    localStorage.setItem('adminNotifications', JSON.stringify(updated));
    setNotifications(updated);
    setUnreadCount(updated.filter(n => !n.read).length);
    toast.success('Notification marked as read');
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    localStorage.setItem('adminNotifications', JSON.stringify(updated));
    setNotifications(updated);
    setUnreadCount(0);
    toast.success('All notifications marked as read');
  };

  const clearAll = () => {
    if (window.confirm('Clear all notifications?')) {
      localStorage.setItem('adminNotifications', JSON.stringify([]));
      setNotifications([]);
      setUnreadCount(0);
      toast.success('All notifications cleared');
    }
  };

  const getIcon = (action) => {
    const lowerAction = action.toLowerCase();
    if (lowerAction.includes('complete') || lowerAction.includes('completed')) 
      return <FaCheckCircle className="text-green-400" />;
    if (lowerAction.includes('comment')) 
      return <FaComment className="text-blue-400" />;
    if (lowerAction.includes('attach') || lowerAction.includes('file')) 
      return <FaPaperclip className="text-purple-400" />;
    if (lowerAction.includes('start')) 
      return <FaPlay className="text-green-400" />;
    if (lowerAction.includes('pause')) 
      return <FaPause className="text-yellow-400" />;
    if (lowerAction.includes('progress')) 
      return <FaPlay className="text-cyan-400" />;
    return <FaBell className="text-gray-400" />;
  };

  const getTimeAgo = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch {
      return 'Just now';
    }
  };

  // Count unread notifications
  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 relative"
      >
        <FaBell className="text-xl" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-96 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-700 flex items-center justify-between bg-gray-800">
            <h3 className="text-white font-semibold">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-blue-400 text-xs hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  <FaCheckDouble className="text-xs" />
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button 
                  onClick={clearAll}
                  className="text-red-400 text-xs hover:text-red-300 transition-colors"
                >
                  <FaTrash className="text-xs" />
                </button>
              )}
              <button 
                onClick={() => setShowDropdown(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto bg-gray-800/95">
            {notifications.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">No notifications</p>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`p-4 hover:bg-gray-700/50 transition-colors cursor-pointer border-b border-gray-700/50 ${
                    !notif.read ? 'bg-blue-500/10 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      {getIcon(notif.action)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{notif.taskTitle || 'Task'}</p>
                      <p className="text-gray-300 text-xs mt-0.5">{notif.action}</p>
                      {notif.details && (
                        <p className="text-gray-500 text-[10px] mt-0.5 truncate">{notif.details}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-500 text-[10px]">by {notif.user || 'Worker'}</span>
                        <span className="text-gray-600 text-[10px]">•</span>
                        <span className="text-gray-500 text-[10px]">{getTimeAgo(notif.timestamp)}</span>
                      </div>
                    </div>
                    {!notif.read ? (
                      <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1 animate-pulse" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-gray-600 flex-shrink-0 mt-1" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-2 border-t border-gray-700 bg-gray-800/90 text-center">
              <span className="text-gray-500 text-xs">
                {unreadNotifications.length} unread • {notifications.length} total
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;