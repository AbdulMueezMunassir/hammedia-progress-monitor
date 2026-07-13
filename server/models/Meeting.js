const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['F3', 'EXCO'],
    required: true
  },
  description: String,
  agenda: String,
  date: {
    type: Date,
    required: true
  },
  startTime: String,
  endTime: String,
  actualStartTime: Date,
  actualEndTime: Date,
  duration: Number,
  location: String,
  meetingLink: String,
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['organizer', 'presenter', 'attendee']
    },
    attendance: {
      type: String,
      enum: ['present', 'absent', 'late', 'excused'],
      default: 'absent'
    },
    checkInTime: Date,
    checkOutTime: Date
  }],
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  summary: String,
  decisions: String,
  notes: String,
  actionItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ActionItem'
  }],
  previousMeeting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meeting'
  },
  attachments: [{
    name: String,
    url: String,
    type: String
  }],
  week: {
    type: String
  },
  year: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to set week and year
meetingSchema.pre('save', function(next) {
  const date = this.date || new Date();
  const year = date.getFullYear();
  const week = getWeekNumber(date);
  this.week = `${year}-W${String(week).padStart(2, '0')}`;
  this.year = year;
  next();
});

function getWeekNumber(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

module.exports = mongoose.model('Meeting', meetingSchema);