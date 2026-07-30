const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const UserSchema = new mongoose.Schema({
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

const User = mongoose.model('User', UserSchema);

async function createWorker() {
  try {
    await mongoose.connect('mongodb://localhost:27017/hammedia');
    console.log('✅ Connected to MongoDB');

    const existingWorker = await User.findOne({ email: 'worker@hammedia.com' });
    if (existingWorker) {
      console.log('✅ Worker already exists!');
      console.log('📧 Email: worker@hammedia.com');
      console.log('🔑 Password: worker123');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('worker123', salt);

    const worker = new User({
      name: 'Ahmed Ali',
      email: 'worker@hammedia.com',
      password: hashedPassword,
      role: 'worker',
      employeeId: 'EMP-001',
      department: 'Design',
      position: 'UI/UX Designer',
      phone: '+971 50 123 4567',
      isActive: true,
      createdAt: new Date()
    });

    await worker.save();
    console.log('✅ Worker created successfully!');
    console.log('📧 Email: worker@hammedia.com');
    console.log('🔑 Password: worker123');
    console.log('👤 Role: Worker');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating worker:', error.message);
    process.exit(1);
  }
}

createWorker();