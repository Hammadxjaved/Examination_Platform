const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher', 
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Exam', ExamSchema);
