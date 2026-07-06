const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const adminExists = await User.findOne({ email: 'admin@hammedia.com' });
    
    if (adminExists) {
      console.log('Admin already exists');
      process.exit();
    }
    
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@hammedia.com',
      password: 'admin123',
      role: 'admin',
      employeeId: 'ADMIN-001',
      department: 'Management',
      position: 'System Administrator',
      phone: '+971 50 000 0000',
      isActive: true
    });
    
    console.log('Admin created successfully!');
    console.log('Email: admin@hammedia.com');
    console.log('Password: admin123');
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();