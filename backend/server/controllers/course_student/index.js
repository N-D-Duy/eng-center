const mongoose = require('mongoose');
const Student = require('../../models/student');
const Course = require('../../models/course');
const CourseStudent = require('../../models/course_student');
const Attendance = require('../../models/attendance');
const { sendZaloMessage } = require('../direct_message');

//trigger when a student join a course
const triggerCourseStudentJoin = async (req, res) => {
    try {
        const { course, student } = req.body;
        //check if course and student exist
        const courseData = await Course.findById(course);
        if (!courseData) {
            if (courseData.current_joined >= courseData.capacity) {
                return res.status(400).json({
                    message: 'Course is full'
                });
            }
        }

        const studentData = await Student.findById(student);
        if (!courseData || !studentData) {
            return res.status(404).json({
                message: 'Course or student not found'
            });
        }

        //if yes, create a new courseStudent
        const courseStudent = new CourseStudent({
            student: student,
            course: course
        });
        await courseStudent.save();
        //joined increase by 1
        await Course.findByIdAndUpdate(course, { current_joined: courseData.current_joined + 1 });

        return res.status(200).json({
            data: courseStudent,
            message: 'student join course successfully'
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
        const { course, student } = req.body;
        //check if course and student exist
        const courseData = await Course.findById(course);
        const studentData = await Student.findById(student);
        if (!courseData || !studentData) {
            return res.status(404).json({
                message: 'Course or student not found'
            });
        }

        //if yes, delete the courseStudent
        const courseStudent = await CourseStudent.findOneAndDelete({
            student: student,
            course: course
        });
        if (!courseStudent) {
            return res.status(404).json({
                message: 'Course student not found'
            });
        }

        //joined decrease by 1
        await Course.findByIdAndUpdate(course, { current_joined: courseData.current_joined - 1 });

        return res.status(200).json({
            data: courseStudent,
            message: 'student leave course successfully'
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

const attendanceHandler = async (req, res) => {
    try {
        const { course, students, day } = req.body;

        // Check if course exists
        const courseData = await Course.findById(course);
        if (!courseData) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        // Extract student IDs
        const studentIds = students.map(student => student.id);

        // Check if all students exist
        const studentData = await Student.find({ _id: { $in: studentIds } });
        if (studentData.length !== studentIds.length) {
            return res.status(404).json({
                message: 'One or more students not found'
            });
        }

        // Create bulk operations for updating attendance
        const bulkOperations = students.map(student => ({
            updateOne: {
                filter: { student: student.id, course: course },
                update: {
                    $inc: {
                        attendance_count: student.is_attended ? 1 : 0,
                        absent_count: student.is_attended ? 0 : 1
                    }
                }
            }
        }));


        // Execute bulk operations
        const bulkWriteResult = await CourseStudent.bulkWrite(bulkOperations);

        if (bulkWriteResult.modifiedCount === 0) {
            return res.status(404).json({
                message: 'No course-student records updated'
            });
        }

        //update attendance of each student
        for (let student of students) {
            await Attendance.create({
                student: student.id,
                course: course,
                isAttend: student.is_attended,
                day: day,
                status: student.is_attended ? 'well done' : student.reasons
            });
        };

        //send zalo message to parent if student is absent
        for(let student of students){
            if(!student.is_attended){
                const studentData = await Student.findById(student.id).populate({
                    path: 'parent',
                    populate: {
                        path: 'account',
                        select: 'facebook',
                        model: 'Account'
                    }
                });
                const facebook = studentData.parent.account.facebook;
                if(!facebook) {
                    const facebookId = facebook.split('/')[3];
                    console.log(facebookId);
                    //send message to parent
                    try{
                        const sendMessageResponse = await sendFacebookMessage('Your child is absent today', phone);
                        console.log('Facebook message sent:', sendMessageResponse);
                    } catch (err) {
                        console.error('Error sending zalo message:', err);
                    }
                } else {
                    console.log('Parent does not have facebook account');
                }
            }
        }
        return res.status(200).json({
            data: bulkWriteResult,
            message: 'Attendance updated successfully'
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};



//get the attendance of a student in a course
const getAttendance = async (req, res) => {
    try {
        const { student, course } = req.params;
        //join course_student to get all joined course id
        const courseStudent = await CourseStudent.find({ student: student, course: course });
        const attendance = await Attendance.find({ student: student, course: course });
        return res.status(200).json({
            data: [courseStudent, attendance]
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}




module.exports = {
    triggerCourseStudentJoin,
    triggerCourseStudentLeave,
    attendanceHandler,
    getAttendance
};