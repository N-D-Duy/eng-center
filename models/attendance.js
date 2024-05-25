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