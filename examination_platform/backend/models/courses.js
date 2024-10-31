const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false
  },
  programs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program'
    }
  ],
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teachers' 
    }
  ]
});

module.exports = mongoose.model('Course', CourseSchema);
