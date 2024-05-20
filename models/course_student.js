const mongoose = require('mongoose');
const uuid = require('uuid');

const courseStudentSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    course_id: {
        type: String,
        required: 'Course id is required'
    },
    student_id: {
        type: String,
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