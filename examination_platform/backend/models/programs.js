const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  ]
});

module.exports = mongoose.model('Program', ProgramSchema);
