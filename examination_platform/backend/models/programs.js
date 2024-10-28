const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
    program_name: {
        type: String,
        required: true,
    },
    number_of_semesters: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model('courses', coursesSchema);
