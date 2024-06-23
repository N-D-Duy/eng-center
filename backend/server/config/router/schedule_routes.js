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

    /**
     * @swagger
     * /api/schedule/{id}:
     *   get:
     *     summary: Get schedule by ID
     *     tags: [Schedules]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Schedule ID
     *     responses:
     *       200:
     *         description: Schedule details
     */
    app.get('/api/schedule/:id', controller.scheduleData.getSchedule);

    /**
     * @swagger
     * /api/schedule:
     *   post:
     *     summary: Create a new schedule
     *     tags: [Schedules]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *              course:
     *                  type: string
     *                  description: The ID of the course
     *                  example: "666873f388b4360aeb1827da"
     *              teacher:
     *                  type: string
     *                  description: The ID of the teacher
     *                  example: "666871e5273b637b6f9e2721"
     *              startDate:
     *                  type: string
     *                  format: date
     *                  description: The start date of the course
     *                  example: "2024-06-11"
     *              numberOfWeeks:
     *                  type: integer
     *                  description: The number of weeks the course will run
     *                  example: 1
     *              daysOfWeek:
     *                  type: array
     *                  description: Days of the week the course will be held (1 - Sunday, 2 - Monday, ..., 7 - Saturday)
     *              items:
     *                  type: integer
     *                  enum: [1, 2, 3, 4, 5, 6, 7]
     *                  example: [2, 5]
     *              startTime:
     *                  type: string
     *                  description: The start time of the course
     *                  example: "09:00 AM"
     *              endTime:
     *                  type: string
     *                  description: The end time of the course
     *                  example: "12:00 AM"
     *     responses:
     *       201:
     *         description: Schedule created successfully
     */
    app.post('/api/schedule', controller.scheduleData.createSchedule);
};
