import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Methods
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  changePassword: (data) => api.put('/auth/change-password', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.put(`/auth/reset-password/${token}`, { password }),
};

export const userAPI = {
  getWorkers: () => api.get('/users/workers'),
  createWorker: (data) => api.post('/users/workers', data),
  updateWorker: (id, data) => api.put(`/users/workers/${id}`, data),
  deleteWorker: (id) => api.delete(`/users/workers/${id}`),
};

export const meetingAPI = {
  getMeetings: () => api.get('/meetings'),
  createMeeting: (data) => api.post('/meetings', data),
  updateMeeting: (id, data) => api.put(`/meetings/${id}`, data),
  deleteMeeting: (id) => api.delete(`/meetings/${id}`),
  startMeeting: (id) => api.post(`/meetings/${id}/start`),
  endMeeting: (id, data) => api.post(`/meetings/${id}/end`, data),
};

export const taskAPI = {
  getTasks: () => api.get('/tasks'),
  createTask: (data) => api.post('/tasks', data),
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  updateProgress: (id, progress) => api.patch(`/tasks/${id}/progress`, { progress }),
};

export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getActivity: () => api.get('/dashboard/activity'),
  getComplete: () => api.get('/dashboard/complete'),
  getWeekly: () => api.get('/dashboard/weekly'),
};

export const reportAPI = {
  generateTaskReport: (params) => api.get('/reports/tasks', { params }),
  generateMeetingReport: (params) => api.get('/reports/meetings', { params }),
  generateWorkerReport: (params) => api.get('/reports/workers', { params }),
};

export default api;