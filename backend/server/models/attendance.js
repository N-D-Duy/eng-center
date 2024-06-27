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
    isAttend:{
        type: Boolean,
        default: false
    },
    day: {
        type: String,
        required: 'day is required'
    },
    status: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Attendance', attendanceSchema);