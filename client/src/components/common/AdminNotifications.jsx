import React, { useState, useEffect } from 'react';
import { FaBell, FaTimes, FaCheckCircle, FaComment, FaPaperclip, FaPlay, FaPause } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadNotifications();
    // Check for new notifications every 5 seconds
    const interval = setInterval(loadNotifications, 5000);
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
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    localStorage.setItem('adminNotifications', JSON.stringify(updated));
    setNotifications(updated);
    setUnreadCount(0);
    toast.success('All notifications marked as read');
  };

  const getIcon = (action) => {
    if (action.includes('completed') || action.includes('Complete')) return <FaCheckCircle className="text-green-400" />;
    if (action.includes('comment')) return <FaComment className="text-blue-400" />;
    if (action.includes('attachment')) return <FaPaperclip className="text-purple-400" />;
    if (action.includes('started')) return <FaPlay className="text-green-400" />;
    if (action.includes('paused')) return <FaPause className="text-yellow-400" />;
    return <FaBell className="text-gray-400" />;
  };

  const getTimeAgo = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch {
      return 'Just now';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 relative"
      >
        <FaBell className="text-xl" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-96 glass rounded-xl border border-white/10 shadow-xl z-50 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-white font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-white/40 text-xs hover:text-white transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-white/40 text-sm text-center py-4">No notifications</p>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 ${
                    !notif.read ? 'bg-blue-500/5 border-l-2 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getIcon(notif.action)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{notif.taskTitle}</p>
                      <p className="text-white/60 text-xs mt-0.5">{notif.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-white/30 text-[10px]">by {notif.user || 'Worker'}</span>
                        <span className="text-white/20 text-[10px]">•</span>
                        <span className="text-white/20 text-[10px]">{getTimeAgo(notif.timestamp)}</span>
                      </div>
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;