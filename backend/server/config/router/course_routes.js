const controller = require('../../controllers');
module.exports = (app) => {

    /**
     * @swagger
     * /api/course/{course}/student/{student}/attendance:
     *   get:
     *     summary: Get student attendance in a course
     *     tags: [Attendance]
     *     parameters:
     *       - in: path
     *         name: course
     *         schema:
     *           type: string
     *         required: true
     *         description: Course ID
     *       - in: path
     *         name: student
     *         schema:
     *           type: string
     *         required: true
     *         description: Student ID
     *     responses:
     *       200:
     *         description: Student attendance information
     */
    app.get('/api/course/:course/student/:student/attendance', controller.courseData.getStudentAttendance);

    /**
     * @swagger
     * /api/course/attendance:
     *   post:
     *     summary: Record student attendance
     *     tags: [Attendance]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               course:
     *                 type: string
     *                 example: "666873f388b4360aeb1827da"
     *               students:
     *                 type: array
     *                 items:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                       example: "666873b73e166087045db9a5"
     *                     is_attended:
     *                       type: integer
     *                       enum: [0, 1]
     *                       example: 0
     *     responses:
     *       201:
     *         description: Attendance recorded successfully
     */
    app.post('/api/course/attendance', controller.courseData.studentAttendance);

    /**
     * @swagger
     * /api/{id}/students:
     *   get:
     *     summary: Get all students in a course
     *     tags: [Courses]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Course ID
     *     responses:
     *       200:
     *         description: List of students in the course
     */
    app.get('/api/:id/students', controller.courseData.getAllStudentsInCourse);

    /**
     * @swagger
     * /api/courses/search:
     *   get:
     *     summary: Search for courses
     *     tags: [Courses]
     *     responses:
     *       200:
     *         description: List of courses matching search criteria
     */
    app.get('/api/courses/search', controller.courseData.findCourse);

    /**
     * @swagger
     * /api/courses/new:
     *   get:
     *     summary: Get new courses
     *     tags: [Courses]
     *     responses:
     *       200:
     *         description: List of new courses
     */
    app.get('/api/courses/new', controller.courseData.getNewCourses);

    /**
     * @swagger
     * /api/courses:
     *   get:
     *     summary: Get all courses
     *     tags: [Courses]
     *     responses:
     *       200:
     *         description: List of all courses
     */
    app.get('/api/courses', controller.courseData.getAllCourses);

    /**
     * @swagger
     * /api/course/{id}:
     *   get:
     *     summary: Get course by ID
     *     tags: [Courses]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Course ID
     *     responses:
     *       200:
     *         description: Course details
     */
    app.get('/api/course/:id', controller.courseData.getCourseById);

    /**
     * @swagger
     * /api/course/{id}:
     *   put:
     *     summary: Update course information
     *     tags: [Admin]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Course ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *              name:
     *                  type: string
     *                  description: The name of the course
     *                  example: "Introduction to Programming"
     *              description:
     *                  type: string
     *                  description: The description of the course
     *                  example: "This course covers the basics of programming."
     *              category:
     *                  type: string
     *                  description: The category of the course
     *                  example: "Computer Science"
     *              price:
     *                  type: number
     *                  description: The price of the course
     *                  example: 99.99
     *              image:
     *                  type: string
     *                  description: The image URL for the course
     *                  example: "http://example.com/image.jpg"
     *              grade:
     *                  type: number
     *                  description: The grade level for the course
     *                  example: 10
     *              status:
     *                  type: string
     *                  description: The status of the course
     *                  default: "inactive"
     *                  example: "active"
     *              teacher:
     *                  type: string
     *                  description: The ID of the teacher for the course
     *                  example: "60c72b2f9b1d8e6d88e5f3a7"
     *              capacity:
     *                  type: number
     *                  description: The maximum number of students that can join the course
     *                  example: 30
     *              current_joined:
     *                  type: number
     *                  description: The current number of students joined
     *                  example: 10
     *     responses:
     *       200:
     *         description: Course updated successfully
     */
    app.put('/api/course/:id', controller.courseData.updateCourse);

    /**
     * @swagger
     * /api/course/{id}:
     *   delete:
     *     summary: Delete a course
     *     tags: [Admin]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Course ID
     *     responses:
     *       200:
     *         description: Course deleted successfully
     */
    app.delete('/api/course/:id', controller.courseData.deleteCourse);

    /**
     * @swagger
     * /api/course:
     *   post:
     *     summary: Create a new course
     *     tags: [Admin]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *              name:
     *                  type: string
     *                  description: The name of the course
     *                  example: "Introduction to Programming"
     *              description:
     *                  type: string
     *                  description: The description of the course
     *                  example: "This course covers the basics of programming."
     *              category:
     *                  type: string
     *                  description: The category of the course
     *                  example: "Computer Science"
     *              price:
     *                  type: number
     *                  description: The price of the course
     *                  example: 99.99
     *              image:
     *                  type: string
     *                  description: The image URL for the course
     *                  example: "http://example.com/image.jpg"
     *              grade:
     *                  type: number
     *                  description: The grade level for the course
     *                  example: 10
     *              status:
     *                  type: string
     *                  description: The status of the course
     *                  default: "inactive"
     *                  example: "active"
     *              teacher:
     *                  type: string
     *                  description: The ID of the teacher for the course
     *                  example: "60c72b2f9b1d8e6d88e5f3a7"
     *              capacity:
     *                  type: number
     *                  description: The maximum number of students that can join the course
     *                  example: 30
     *              current_joined:
     *                  type: number
     *                  description: The current number of students joined
     *                  example: 10
     *     responses:
     *       201:
     *         description: Course created successfully
     */
    app.post('/api/course', controller.courseData.createCourse);

    /**
     * @swagger
     * /api/course/join:
     *   post:
     *     summary: Join a course
     *     tags: [Courses]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               courseId:
     *                 type: string
     *               studentId:
     *                 type: string
     *     responses:
     *       200:
     *         description: Joined course successfully
     */
    app.post('/api/course/join', controller.courseData.joinCourse);

    /**
     * @swagger
     * /api/course/leave:
     *   post:
     *     summary: Leave a course
     *     tags: [Courses]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               courseId:
     *                 type: string
     *               studentId:
     *                 type: string
     *     responses:
     *       200:
     *         description: Left course successfully
     */
    app.post('/api/course/leave', controller.courseData.leaveCourse);

};
