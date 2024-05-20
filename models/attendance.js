const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: 'Student ID is required'
    },
    courseId: {
        type: String,
        required: 'Course ID is required'
    },
    date: {
        type: Date,
        required: 'Date is required'
    },
    status: {
        type: String,
        required: 'Status is required'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Attendance', attendanceSchema);