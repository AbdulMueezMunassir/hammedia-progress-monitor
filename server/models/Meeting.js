const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Meeting title is required']
  },
  description: String,
  agenda: String,
  date: {
    type: Date,
    required: [true, 'Meeting date is required']
  },
  startTime: String,
  endTime: String,
  actualStartTime: Date,
  actualEndTime: Date,
  duration: Number,
  location: String,
  meetingLink: String,
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  summary: String,
  decisions: String,
  notes: String,
  attachments: [{
    name: String,
    url: String,
    type: String
  }],
  previousMeeting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meeting'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Meeting', meetingSchema);
