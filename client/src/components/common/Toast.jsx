import React from 'react';
import toast from 'react-hot-toast';

export const showToast = {
  success: (message) => toast.success(message, {
    style: {
      background: 'rgba(30, 41, 59, 0.9)',
      backdropFilter: 'blur(12px)',
      color: '#f1f5f9',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '12px',
    },
    iconTheme: {
      primary: '#10b981',
      secondary: '#f1f5f9',
    },
  }),
  error: (message) => toast.error(message, {
    style: {
      background: 'rgba(30, 41, 59, 0.9)',
      backdropFilter: 'blur(12px)',
      color: '#f1f5f9',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '12px',
    },
    iconTheme: {
      primary: '#ef4444',
      secondary: '#f1f5f9',
    },
  }),
  info: (message) => toast(message, {
    style: {
      background: 'rgba(30, 41, 59, 0.9)',
      backdropFilter: 'blur(12px)',
      color: '#f1f5f9',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '12px',
    },
  }),
};

export default showToast;