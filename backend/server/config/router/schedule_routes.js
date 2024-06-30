const controller = require('../../controllers');

module.exports = (app) => {
    /**
     * @swagger
     * /api/schedule/student/{id}:
     *   get:
     *     summary: Get student schedule by student ID
     *     tags: [Schedules]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Student ID
     *     responses:
     *       200:
     *         description: Student schedule
     */
    app.get('/api/schedule/student/:id', controller.scheduleData.getStudentSchedule);

    /**
     * @swagger
     * /api/schedule/teacher/{id}:
     *   get:
     *     summary: Get teacher schedule by teacher ID
     *     tags: [Schedules]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Teacher ID
     *     responses:
     *       200:
     *         description: Teacher schedule
     */
    app.get('/api/schedule/teacher/:id', controller.scheduleData.getTeacherSchedule);

    /**
     * @swagger
     * /api/schedule/course/{course}:
     *   get:
     *     summary: Get student attendance in a course
     *     tags: [Schedules]
     *     parameters:
     *       - in: path
     *         name: course
     *         schema:
     *           type: string
     *         required: true
     *         description: Course ID
     *     responses:
     *       200:
     *         description: Student attendance in the course
     */
    app.get('/api/schedule/course/:course', controller.scheduleData.getStudentAttendanceInCourse);

};
