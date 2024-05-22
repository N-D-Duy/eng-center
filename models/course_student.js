const mongoose = require('mongoose');
const uuid = require('uuid');

const courseStudentSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: 'Course id is required'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: 'Student id is required'
    },
    attendance_count:{
        type: Number,
        default: 0
    },
    absent_count:{
        type: Number,
        default: 0
    },
    tuition_course_due:{
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('CourseStudent', courseStudentSchema);