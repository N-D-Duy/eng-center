const CourseSchedule = require('../../../models/course_schedule');
const CourseStudent = require('../../../models/course_student');
const setAsync = require('../../controllers/redis/cachedApi').setAsync;

const getSchedule = async (req, res) => {
    // with course id as input, return the schedule of the course
    try {
        const { id } = req.params;
        const schedules = await CourseSchedule.find({ course: id }).exec();
        if (!schedule) {
            return res.status(404).json({
                message: 'Schedule not found'
            });
        }
        /* const cacheKey = `course_schedules_${courseId}`;
        await setAsync(cacheKey, JSON.stringify(schedules), 'EX', 3600); // Cache data for 1 hour */
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
const createSchedule = async (req, res) => {
    const { course, teacher, startDate, numberOfWeeks, daysOfWeek, startTime, endTime } = req.body;
    try {
        const schedules = await createCourseSchedulesAuto(course, teacher, startDate, numberOfWeeks, daysOfWeek, startTime, endTime);
        if (schedules.length === 0) {
            return res.status(500).json({
                message: 'Error creating schedules'
            });
        }
        return res.status(200).json({
            data: schedules,
            message: 'Schedules created successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
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
        const { student } = req.params;
        //join course_student to get all joined course id
        const courseStudent = await CourseStudent.find({ student }).populate('course');
        const courses = courseStudent.map(cs => cs.course._id);
        //get all schedule of the courses
        const schedules = await CourseSchedule.find({ course: { $in: courses } }).populate({
            path: 'course',
            select: 'name'
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
        const { teacher } = req.params;
        const schedule = await CourseSchedule.find({ teacher });
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

module.exports = {
    getSchedule,
    createSchedule,
    getStudentSchedule,
    getTeacherSchedule
};




