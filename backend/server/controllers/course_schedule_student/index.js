const Attendance = require('../../models/attendance');
const CourseSchedule = require('../../models/course_schedule');
const CourseStudent = require('../../models/course_student');
const setAsync = require('../../controllers/redis/cachedApi').setAsync;

const getSchedule = async (req, res) => {
    // with course id as input, return the schedule of the course
    try {
        const id = req.params.id;
        const schedules = await CourseSchedule.find({ course: id }).exec();
        if (!schedules) {
            return res.status(404).json({
                message: 'Schedule not found'
            });
        }
        return res.status(200).json({
            data: schedules,
            message: 'Schedule retrieved successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
const createSchedule = async (courseId, scheduleData) => {
    const { teacher, startDate, numberOfWeeks, daysOfWeek, startTime, endTime } = scheduleData;
  
    try {
      // Create schedules automatically
      const schedules = await createCourseSchedulesAuto(courseId, teacher, startDate, numberOfWeeks, daysOfWeek, startTime, endTime);
      return schedules;
    } catch (error) {
      throw new Error('Error creating schedules');
    }
  };

const createCourseSchedulesAuto = async (course, teacher, startDate, numberOfWeeks, daysOfWeek, startTime, endTime) => {
    const schedules = [];
    const start = new Date(startDate);

    for (let i = 0; i < numberOfWeeks; i++) {
        daysOfWeek.forEach(day => {
            const date = new Date(start);
            date.setDate(start.getDate() + (day - start.getDay() + 7) % 7 + i * 7);

            // Ensure the date is not before the start date
            if (date >= start) {
                schedules.push({
                    course: course,
                    teacher: teacher,
                    day: date.toISOString().split('T')[0],
                    start_time: startTime,
                    end_time: endTime,
                    status: 'active'
                });
            }
        });
    }

    try {
        const insertedSchedules = await CourseSchedule.insertMany(schedules);
        console.log('Course schedules created successfully');
        return insertedSchedules;
    } catch (err) {
        console.error('Error creating course schedules:', err);
        return [];
    }
};


const getStudentSchedule = async (req, res) => {
    try {
        const id = req.params.id;
        //join course_student to get all joined course id
        const courseStudent = await CourseStudent.find({ student: id }).populate('course');
        const courses = courseStudent.map(cs => cs.course._id);
        //get all schedule of the courses
        const schedules = await CourseSchedule.find({ course: { $in: courses } }).populate(
            {
                path: 'course'
            }
        ).populate({
            path: 'teacher'
        });
        return res.status(200).json({
            data: schedules,
            message: 'Student schedule retrieved successfully'
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
const getTeacherSchedule = async (req, res) => {
    try {
        const id = req.params.id;
        const schedule = await CourseSchedule.find({ teacher: id }).populate({
            path: 'course'
        }).populate({
            path: 'teacher'
        });
        return res.status(200).json({
            data: schedule,
            message: 'Teacher schedule retrieved successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const getStudentAttendanceInCourse = async (req, res) => {
    try {
        const course = req.params.course;
        //get attendance of all students in a course
        const attendance = await Attendance.find({ course: course }).populate('student').exec();
        return res.status(200).json({
            data: attendance,
            message: 'Attendance retrieved successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}



module.exports = {
    getSchedule,
    createSchedule,
    getStudentSchedule,
    getTeacherSchedule,
    getStudentAttendanceInCourse
};




