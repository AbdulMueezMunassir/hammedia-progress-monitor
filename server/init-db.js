const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

// Import models
const User = require('./models/User');
const Meeting = require('./models/Meeting');
const Task = require('./models/Task');
const Attendance = require('./models/Attendance');

async function initDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/hammedia');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Meeting.deleteMany({});
    await Task.deleteMany({});
    await Attendance.deleteMany({});
    console.log('✅ Cleared existing data');

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const workerPassword = await bcrypt.hash('worker123', salt);

    // Create Admin
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

    // Create Workers
    const workers = [
      {
        name: 'Ahmed Ali',
        email: 'ahmed@hammedia.com',
        password: workerPassword,
        role: 'worker',
        employeeId: 'EMP-001',
        department: 'Design',
        position: 'UI/UX Designer',
        phone: '+971 50 123 4567',
        isActive: true
      },
      {
        name: 'Fathima Noor',
        email: 'fathima@hammedia.com',
        password: workerPassword,
        role: 'worker',
        employeeId: 'EMP-002',
        department: 'Development',
        position: 'Full Stack Developer',
        phone: '+971 50 234 5678',
        isActive: true
      },
      {
        name: 'Mohamed Rashid',
        email: 'mohamed@hammedia.com',
        password: workerPassword,
        role: 'worker',
        employeeId: 'EMP-003',
        department: 'Marketing',
        position: 'Marketing Manager',
        phone: '+971 50 345 6789',
        isActive: true
      },
      {
        name: 'Sara Ahmed',
        email: 'sara@hammedia.com',
        password: workerPassword,
        role: 'worker',
        employeeId: 'EMP-004',
        department: 'HR',
        position: 'HR Manager',
        phone: '+971 50 456 7890',
        isActive: true
      }
    ];

    const createdWorkers = [];
    for (const workerData of workers) {
      const worker = new User(workerData);
      await worker.save();
      createdWorkers.push(worker);
      console.log(`✅ Worker created: ${worker.email} / worker123`);
    }

    // Create Sample Meetings
    const meetings = [
      {
        title: 'Weekly Team Sync',
        description: 'Weekly progress review and planning',
        agenda: 'Review weekly progress, plan next week tasks',
        date: new Date('2024-01-20'),
        startTime: '10:00',
        endTime: '11:00',
        location: 'Meeting Room A',
        priority: 'high',
        status: 'upcoming',
        organizer: admin._id,
        participants: createdWorkers.map(w => w._id),
        summary: 'Weekly team sync meeting',
        decisions: 'Continue with current sprint',
        notes: 'All team members to update their progress'
      },
      {
        title: 'Project Review',
        description: 'Quarterly project review',
        agenda: 'Review project milestones and deliverables',
        date: new Date('2024-01-15'),
        startTime: '14:00',
        endTime: '16:00',
        location: 'Virtual',
        meetingLink: 'https://meet.google.com/abc-defg-hij',
        priority: 'medium',
        status: 'completed',
        organizer: admin._id,
        participants: createdWorkers.slice(0, 2).map(w => w._id),
        summary: 'Project is on track',
        decisions: 'Need to focus on testing phase',
        notes: 'All deliverables completed'
      }
    ];

    const createdMeetings = [];
    for (const meetingData of meetings) {
      const meeting = new Meeting(meetingData);
      await meeting.save();
      createdMeetings.push(meeting);
      console.log(`✅ Meeting created: ${meeting.title}`);
    }

    // Create Sample Tasks
    const tasks = [
      {
        title: 'Design Dashboard UI',
        description: 'Design main dashboard with glassmorphism effects',
        priority: 'high',
        status: 'in-progress',
        assignedTo: createdWorkers[0]._id,
        assignedBy: admin._id,
        meeting: createdMeetings[0]._id,
        deadline: new Date('2024-01-25'),
        estimatedHours: 8,
        progress: 75,
        startedAt: new Date('2024-01-18')
      },
      {
        title: 'Backend API Integration',
        description: 'Integrate REST APIs for user authentication',
        priority: 'high',
        status: 'pending',
        assignedTo: createdWorkers[1]._id,
        assignedBy: admin._id,
        meeting: createdMeetings[0]._id,
        deadline: new Date('2024-01-30'),
        estimatedHours: 12,
        progress: 0
      },
      {
        title: 'Testing & Bug Fixes',
        description: 'Test all features and fix bugs',
        priority: 'medium',
        status: 'completed',
        assignedTo: createdWorkers[2]._id,
        assignedBy: admin._id,
        meeting: createdMeetings[1]._id,
        deadline: new Date('2024-01-18'),
        estimatedHours: 6,
        progress: 100,
        startedAt: new Date('2024-01-10'),
        completedAt: new Date('2024-01-18')
      },
      {
        title: 'Documentation',
        description: 'Create comprehensive documentation',
        priority: 'low',
        status: 'pending',
        assignedTo: createdWorkers[3]._id,
        assignedBy: admin._id,
        meeting: createdMeetings[1]._id,
        deadline: new Date('2024-01-28'),
        estimatedHours: 4,
        progress: 30
      }
    ];

    for (const taskData of tasks) {
      const task = new Task(taskData);
      await task.save();
      console.log(`✅ Task created: ${task.title}`);
    }

    // Create Sample Attendance
    const attendanceRecords = [
      {
        meeting: createdMeetings[0]._id,
        user: createdWorkers[0]._id,
        status: 'present',
        checkInTime: new Date('2024-01-20T10:00:00'),
        checkOutTime: new Date('2024-01-20T11:00:00'),
        duration: 60,
        markedBy: admin._id
      },
      {
        meeting: createdMeetings[0]._id,
        user: createdWorkers[1]._id,
        status: 'present',
        checkInTime: new Date('2024-01-20T10:05:00'),
        checkOutTime: new Date('2024-01-20T11:00:00'),
        duration: 55,
        markedBy: admin._id
      },
      {
        meeting: createdMeetings[0]._id,
        user: createdWorkers[2]._id,
        status: 'absent',
        markedBy: admin._id
      }
    ];

    for (const attendanceData of attendanceRecords) {
      const attendance = new Attendance(attendanceData);
      await attendance.save();
      console.log(`✅ Attendance recorded for ${attendanceData.user}`);
    }

    console.log('\n✅ Database initialized successfully!');
    console.log('📊 Collections created: users, meetings, tasks, attendance');
    console.log('\n👤 Login Credentials:');
    console.log('📧 Admin: admin@hammedia.com / admin123');
    console.log('📧 Workers:');
    console.log('  - ahmed@hammedia.com / worker123');
    console.log('  - fathima@hammedia.com / worker123');
    console.log('  - mohamed@hammedia.com / worker123');
    console.log('  - sara@hammedia.com / worker123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    process.exit(1);
  }
}

initDatabase();