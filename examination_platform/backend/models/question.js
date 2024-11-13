const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
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
  response: {
    type:String,
    required:false
  }
});

module.exports = mongoose.model('Question', QuestionSchema);
