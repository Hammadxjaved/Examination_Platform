const mongoose = require('mongoose');

const MCQOptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  }
});

const QuestionSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  questionNumber: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['mcq', 'subjective', 'coding'],
    required: true
  },
  marks: {
    type: Number,
    required: true
  },
  // For MCQ questions
  options: [MCQOptionSchema],
  // For coding questions
  testCases: [{
    input: String,
    expectedOutput: String,
  }],
  topics: [String]
});

module.exports = mongoose.model('Question', QuestionSchema);
