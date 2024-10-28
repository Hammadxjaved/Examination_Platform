const mongoose = require('mongoose');
const programs = require('./programs');

const StudentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    faculty_number: {
        type: String,
        unique: true,
        required: true,
    },
    enrollment_no: {
        type: String,
        unique: true,
        required: true,
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'programs',
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Students', StudentsSchema);
