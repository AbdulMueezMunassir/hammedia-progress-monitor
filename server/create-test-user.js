const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hammedia')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  employeeId: String,
  department: String,
  position: String,
  phone: String,
  isActive: Boolean,
  createdAt: Date
});

const User = mongoose.model('User', userSchema);

async function createTestUsers() {
  try {
    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const workerPassword = await bcrypt.hash('worker123', salt);

    // Create admin
    const admin = new User({
      name: 'Admin User',
      email: 'admin@hammedia.com',
      password: adminPassword,
      role: 'admin',
      employeeId: 'ADMIN-001',
      department: 'Management',
      position: 'System Administrator',
      phone: '+971 50 000 0000',
      isActive: true,
      createdAt: new Date()
    });

    await admin.save();
    console.log('✅ Admin created: admin@hammedia.com / admin123');

    // Create worker
    const worker = new User({
      name: 'Ahmed Ali',
      email: 'worker@hammedia.com',
      password: workerPassword,
      role: 'worker',
      employeeId: 'EMP-001',
      department: 'Design',
      position: 'UI/UX Designer',
      phone: '+971 50 123 4567',
      isActive: true,
      createdAt: new Date()
    });

    await worker.save();
    console.log('✅ Worker created: worker@hammedia.com / worker123');

    console.log('\n✅ All users created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating users:', error.message);
    process.exit(1);
  }
}

createTestUsers();