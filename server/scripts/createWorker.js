const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const createWorker = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const worker = await User.create({
      name: 'Ahmed Ali',
      email: 'ahmed@hammedia.com',
      password: 'worker123',
      role: 'worker',
      employeeId: 'EMP-001',
      department: 'Design',
      position: 'UI/UX Designer',
      phone: '+971 50 123 4567',
      isActive: true
    });
    
    console.log('Worker created successfully!');
    console.log('Email: ahmed@hammedia.com');
    console.log('Password: worker123');
    process.exit();
  } catch (error) {
    console.error('Error creating worker:', error);
    process.exit(1);
  }
};

createWorker();