const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: 'ID is required'
    },
    courseId: {
        type: String,
        required: 'Course ID is required'
    },
    date: {
        type: Date,
        required: 'Date is required'
    },
    startTime: {
        type: String,
        required: 'Start time is required'
    },
    endTime: {
        type: String,
        required: 'End time is required'
    },
    teacherId: {
        type: String,
        required: 'Teacher ID is required'
    },
    status: {
        type: String,
        required: 'Status is required'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Schedule', scheduleSchema);