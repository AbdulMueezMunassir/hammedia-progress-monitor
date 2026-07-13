const mongoose = require('mongoose');

const actionItemSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  deadlineDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['not-started', 'on-going', 'stuck', 'hold', 'complete', 'dropped'],
    default: 'not-started'
  },
  meetingType: {
    type: String,
    enum: ['F3', 'EXCO'],
    required: true
  },
  escalatedTo: {
    type: String,
    enum: ['F3', 'EXCO', 'none'],
    default: 'none'
  },
  escalateReason: String,
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  week: String,
  year: Number,
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update week and year
actionItemSchema.pre('save', function(next) {
  const date = this.date || new Date();
  const year = date.getFullYear();
  const week = getWeekNumber(date);
  this.week = `${year}-W${String(week).padStart(2, '0')}`;
  this.year = year;
  this.updatedAt = new Date();
  next();
});

function getWeekNumber(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

module.exports = mongoose.model('ActionItem', actionItemSchema);