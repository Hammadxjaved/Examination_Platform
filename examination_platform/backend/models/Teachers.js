const mongoose = require('mongoose');

const TeachersSchema = new mongoose.Schema({
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
    designation: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        unique: true,
        required: true,
    },
});

module.exports = mongoose.model('Teachers', TeachersSchema);
