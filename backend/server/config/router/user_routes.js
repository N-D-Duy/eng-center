
const controller = require('../../controllers');
module.exports = (app) => {

    /**
     * @swagger
     * /api/student/{id}:
     *   get:
     *     summary: Get student information by ID
     *     tags: [Students]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Student ID
     *     responses:
     *       200:
     *         description: Student information
     */
    app.get('/api/student/:id', controller.userData.StudentData.getStudentInfor);

    /**
     * @swagger
     * /api/students:
     *   get:
     *     summary: Get all students
     *     tags: [Students]
     *     responses:
     *       200:
     *         description: List of all students
     */
    app.get('/api/students', controller.userData.StudentData.getAllStudents);

    /**
     * @swagger
     * /api/student:
     *   post:
     *     summary: Create a new student
     *     tags: [Students]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               account:
     *                 type: object
     *                 properties:
     *                   user_name:
     *                     type: string
     *                     example: "nguyenducduy"
     *                   password:
     *                     type: string
     *                     example: "12332145@"
     *                   role:
     *                     type: string
     *                     example: "student"
     *                   status:
     *                     type: string
     *                     example: "actived"
     *                   email:
     *                     type: string
     *                     example: "nguyenducduy@gmail.com"
     *                   phone:
     *                     type: string
     *                     example: "0213232"
     *               student:
     *                 type: object
     *                 properties:
     *                   name:
     *                     type: string
     *                     example: "nguyễn đức duy"
     *                   cocc_percent:
     *                     type: integer
     *                     example: 30
     *                   tuition_due:
     *                     type: number
     *                     example: 0
     *                   tuition_total:
     *                     type: number
     *                     example: 0
     *                   account:
     *                     type: string
     *                     example: ""
     *                   parent:
     *                     type: string
     *                     example: ""
     *     responses:
     *       201:
     *         description: Student created successfully
     */
    app.post('/api/student', controller.userData.StudentData.createStudent);

    /**
     * @swagger
     * /api/teacher/{id}:
     *   get:
     *     summary: Get teacher information by ID
     *     tags: [Teachers]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Teacher ID
     *     responses:
     *       200:
     *         description: Teacher information
     */
    app.get('/api/teacher/:id', controller.userData.TeacherData.getTeacherInfor);

    /**
     * @swagger
     * /api/teachers:
     *   get:
     *     summary: Get all teachers
     *     tags: [Teachers]
     *     responses:
     *       200:
     *         description: List of all teachers
     */
    app.get('/api/teachers', controller.userData.TeacherData.getAllTeachers);

    /**
     * @swagger
     * /api/teacher:
     *   post:
     *     summary: Create a new teacher
     *     tags: [Teachers]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               account:
     *                 type: object
     *                 properties:
     *                   user_name:
     *                     type: string
     *                     example: "tranvietbao"
     *                   password:
     *                     type: string
     *                     example: "123321"
     *                   role:
     *                     type: string
     *                     example: "teacher"
     *                   status:
     *                     type: string
     *                     example: "actived"
     *                   email:
     *                     type: string
     *                     example: "tranvietbao0907@gmail.com"
     *                   phone:
     *                     type: string
     *                     example: "0213232"
     *               teacher:
     *                 type: object
     *                 properties:
     *                   name:
     *                     type: string
     *                     example: "trần việt bảo"
     *                   session_count:
     *                     type: integer
     *                     example: 0
     *                   account:
     *                     type: string
     *                     example: ""
     *     responses:
     *       201:
     *         description: Teacher created successfully
     */
    app.post('/api/teacher', controller.userData.TeacherData.createTeacher);

    /**
     * @swagger
     * /api/parent/{id}:
     *   get:
     *     summary: Get parent information by ID
     *     tags: [Parents]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Parent ID
     *     responses:
     *       200:
     *         description: Parent information
     */
    app.get('/api/parent/:id', controller.userData.ParentData.getParentInfor);

    /**
     * @swagger
     * /api/parents:
     *   get:
     *     summary: Get all parents
     *     tags: [Parents]
     *     responses:
     *       200:
     *         description: List of all parents
     */
    app.get('/api/parents', controller.userData.ParentData.getAllParents);

    /**
     * @swagger
     * /api/parent:
     *   post:
     *     summary: Create a new parent
     *     tags: [Parents]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               account:
     *                 type: object
     *                 properties:
     *                   user_name:
     *                     type: string
     *                     example: "nguyenvanquyet1"
     *                   password:
     *                     type: string
     *                     example: "12332145@"
     *                   role:
     *                     type: string
     *                     example: "parent"
     *                   status:
     *                     type: string
     *                     example: "actived"
     *                   email:
     *                     type: string
     *                     example: "nguyenvanquyet1@gmail.com"
     *                   phone:
     *                     type: string
     *                     example: "02132321"
     *               parent:
     *                 type: object
     *                 properties:
     *                   name:
     *                     type: string
     *                     example: "nguyễn văn quyết1"
     *                   account:
     *                     type: string
     *                     example: ""
     *                   invite_code:
     *                     type: string
     *                     example: "6668737d3e166087045db9a0"
     *     responses:
     *       201:
     *         description: Parent created successfully
     */
    app.post('/api/parent', controller.userData.ParentData.createParent);

    /**
     * @swagger
     * /api/accounts:
     *   get:
     *     summary: Get all accounts
     *     tags: [Admin]
     *     responses:
     *       200:
     *         description: List of all accounts
     */
    app.get('/api/accounts', controller.userData.getAccounts);

    /**
     * @swagger
     * /api/account/change-password:
     *   post:
     *     summary: Change account password
     *     tags: [Admin]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               emailOrUsername:
     *                type: string
     *               oldPassword:
     *                 type: string
     *               newPassword:
     *                 type: string
     *     responses:
     *       200:
     *         description: Password changed successfully
     */
    app.post('/api/account/change-password', controller.auth.changePassword);

    /**
     * @swagger
     * /api/login:
     *   post:
     *     summary: Login with email and password
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               emailOrUsername:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Login successful
     */
    app.post('/api/login', controller.auth.loginWithEmailAndPassword);

    /**
     * @swagger
     * /api/student/{id}/courses:
     *   get:
     *     summary: Get all courses joined by student
     *     tags: [Students]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Student ID
     *     responses:
     *       200:
     *         description: List of courses
     */
    app.get('/api/student/:id/courses', controller.userData.StudentData.getAllCoursesJoined);

    app.post('/api/admin', controller.userData.AdminData.createAdmin);

};
