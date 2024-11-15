const mongoose = require('mongoose');

const ExamResponseSchema = new mongoose.Schema({
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
      required: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Students',
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    submissionTime: {
      type: Date
    },
    status: {
      type: String,
      enum: ['in-progress', 'submitted', 'evaluated'],
      default: 'in-progress'
    },
    answers: [{
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
      },
      // For MCQ
      selectedOption: Number,
      // For subjective and coding
      answer: String,
      // For coding
      codeOutput: String,

      testCaseResults: [{
        input: String,
        expectedOutput: String,
        actualOutput: String,
        passed: Boolean
      }],
      // Evaluation
      marksObtained: Number,
      
      feedback: String,
      evaluatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teachers'
      },
      evaluatedAt: Date
    }],
    totalMarks: {
      type: Number
    },
    marksObtained: {
      type: Number
    }
  });
  module.exports = mongoose.model('ExamResponse', ExamResponseSchema)