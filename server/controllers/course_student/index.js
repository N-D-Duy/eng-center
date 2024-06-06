const mongoose = require('mongoose');
const Student = require('../../../models/student');
const Course = require('../../../models/course');
const CourseStudent = require('../../../models/course_student');

//trigger when a student join a course
const triggerCourseStudentJoin = async (req, res) => {
    try {
        const {courseId, studentId} = req.body;
        //check if course and student exist
        const course = await Course.findById(courseId);
        const student = await Student.findById(studentId);
        if (!course || !student) {
            return res.status(404).json({
                message: 'Course or student not found'
            });
        }

        //if yes, create a new courseStudent
        const courseStudent = new CourseStudent({
            student: studentId,
            course: courseId
        });
        await courseStudent.save();
        return res.status(200).json({
            data: courseStudent
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};


//trigger when a student leave a course
const triggerCourseStudentLeave = async (req, res) => {
    try {
        const {courseId, studentId} = req.body;
        //check if course and student exist
        const course = await Course.findById(courseId);
        const student = await Student.findById(studentId);
        if (!course || !student) {
            return res.status(404).json({
                message: 'Course or student not found'
            });
        }

        //if yes, delete the courseStudent
        const courseStudent = await CourseStudent.findOneAndDelete({
            student: studentId,
            course: courseId
        });
        if (!courseStudent) {
            return res.status(404).json({
                message: 'Course student not found'
            });
        }
        return res.status(200).json({
            data: courseStudent
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

module.exports = {
    triggerCourseStudentJoin,
    triggerCourseStudentLeave
};