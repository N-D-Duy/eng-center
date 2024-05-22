const CourseSchedule = require('../../../models/course_schedule.js');
const StudentSchedule = require('../../../models/student_schedule.js');

const getStudentSchedule = async (studentId) => {
    try {
        // Get course schedules joined by the student, return type is array of course_schedule objects
        const studentSchedules = await StudentSchedule.find({ student: studentId }).select('course_schedule_id').exec();

        // Extract the course_schedule ids into an array
        const courseScheduleIds = studentSchedules.map(s => s.course_schedule);
 
        // Get the schedule details of each course
        const schedules = await CourseSchedule.find({ _id: { $in: courseScheduleIds } }).exec();
        // Return the schedules
        return schedules;
    }
    catch (err) {
        return { error: err.message };
    }
};


const getTeacherSchedule = async (teacherId) => {
    try {
        const schedule = await CourseSchedule.find(teacherId);
        return schedule;
    }
    catch (err) {
        return err.message;
    }
};

const updateSchedule = async ({studentId, courseId}) => {
    try {
        //
        return studentSchedule;
    }
    catch (err) {
        return err.message;
    }
};

module.exports = { getScheduleInfo: getStudentSchedule };