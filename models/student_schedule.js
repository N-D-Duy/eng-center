const mongoose = require('mongoose');

const studentScheduleSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: 'Student ID is required'
    },
    course_schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseSchedule',
        required: 'Schedule ID is required'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('StudentSchedule', studentScheduleSchema);