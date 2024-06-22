const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: 'Student ID is required'
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: 'Course ID is required'
    },
    day: {
        type: String,
        required: 'day is required'
    },
    status: {
        type: String,
        default: 'no reason'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Attendance', attendanceSchema);