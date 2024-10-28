const mongoose = require('mongoose');
const programs = require('./programs');
const Teacher = require('./Teachers');

const coursesSchema = new mongoose.Schema({
    course_name: {
        type: String,
        required: true,
    },
    course_code: {
        type: String,
        required: true,
        unique: true,
    },
    semester: {
        type: String,
        required: true,
    },
    Assigned_teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'programs',
        unique: true,
        required: true,
    },
});

module.exports = mongoose.model('courses', coursesSchema);
