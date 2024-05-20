const UserController = require('../../../controllers/user_controller');

module.exports = (app) => {
    app.get('/api/student/:id', UserController.getStudentInfor);
    app.get('/api/students', UserController.getAllStudents);
    app.post('/api/student', UserController.createStudent);

    app.get('/api/teacher/:id', UserController.getTeacherInfor);
    app.get('/api/teachers', UserController.getAllTeachers);
    app.post('/api/teacher', UserController.createTeacher);

    app.get('/api/parent/:id', UserController.getParentInfor);
    app.get('/api/parents', UserController.getAllParents);
    app.post('/api/parent', UserController.createParent);
};