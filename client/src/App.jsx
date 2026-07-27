import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './redux/store';


// Simple test component
const TestPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">✅ React is Working!</h1>
        <p className="text-white/60 mt-4">If you can see this, the app is rendering correctly.</p>
        <p className="text-white/40 mt-2">Now checking routing...</p>
      </div>
    </div>
  );
};

// Auth Pages
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ProtectedRoute from './components/common/ProtectedRoute';

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import Workers from './pages/admin/Workers';
import Meetings from './pages/admin/Meetings';
import Tasks from './pages/admin/Tasks';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';

// Worker Pages
import WorkerLayout from './layouts/WorkerLayout';
import WorkerDashboard from './pages/worker/Dashboard';
import WorkerTasks from './pages/worker/Tasks';
import WorkerMeetings from './pages/worker/Meetings';
import WorkerProfile from './pages/worker/Profile';

function App() {
  console.log('App rendering...'); // This will show in console

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(30, 41, 59, 0.9)',
              backdropFilter: 'blur(12px)',
              color: '#f1f5f9',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
            },
          }}
        />
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="workers" element={<Workers />} />
            <Route path="meetings" element={<Meetings />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="workers" element={<Workers />} />
            <Route path="tasks" element={<Tasks />} />
          </Route>

          {/* Worker Routes */}
          <Route 
            path="/worker" 
            element={
              <ProtectedRoute role="worker">
                <WorkerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<WorkerDashboard />} />
            <Route path="tasks" element={<WorkerTasks />} />
            <Route path="meetings" element={<WorkerMeetings />} />
            <Route path="profile" element={<WorkerProfile />} />
          </Route>

          {/* Default */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;