const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock users
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@hammedia.com',
    password: 'admin123',
    role: 'admin',
    employeeId: 'ADMIN-001',
    department: 'Management',
    position: 'System Administrator'
  },
  {
    id: '2',
    name: 'Ahmed Ali',
    email: 'worker@hammedia.com',
    password: 'worker123',
    role: 'worker',
    employeeId: 'EMP-001',
    department: 'Design',
    position: 'UI/UX Designer'
  }
];

const generateToken = (id) => {
  return jwt.sign({ id }, 'hammedia_secret_key_2024', { expiresIn: '7d' });
};

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Hammedia Mock API is running' });
});

// Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email);

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        employeeId: user.employeeId,
        department: user.department,
        position: user.position
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected routes (mock)
app.get('/api/auth/me', (req, res) => {
  res.json({
    success: true,
    user: users[0]
  });
});

app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    totalWorkers: 24,
    activeTasks: 18,
    completedTasks: 42,
    pendingTasks: 15,
    completionRate: 78,
    totalMeetings: 15,
    upcomingMeetings: 5,
    attendanceRate: 85
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock server running on http://localhost:${PORT}`);
  console.log(`📧 Admin: admin@hammedia.com / admin123`);
  console.log(`📧 Worker: worker@hammedia.com / worker123`);
  console.log(`🔗 Health: http://localhost:${PORT}/api/health`);
});