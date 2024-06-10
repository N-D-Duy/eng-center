const controller = require('../../controllers');
module.exports = (app) => {
    app.get('/api/student/:id', controller.userData.StudentData.getStudentInfor);
    app.get('/api/students', controller.userData.StudentData.getAllStudents);
    app.post('/api/student', controller.userData.StudentData.createStudent);
    
    app.get('/api/teacher/:id', controller.userData.TeacherData.getTeacherInfor);
    app.get('/api/teachers', controller.userData.TeacherData.getAllTeachers);
    app.post('/api/teacher', controller.userData.TeacherData.createTeacher);
    
    app.get('/api/parent/:id', controller.userData.ParentData.getParentInfor);
    app.get('/api/parents', controller.userData.ParentData.getAllParents);
    app.post('/api/parent', controller.userData.ParentData.createParent);

    //account
    app.get('/api/accounts', controller.userData.getAccounts);
    app.post('/api/account/change-password', controller.auth.changePassword);
    
    //auth
    app.post('/api/login', controller.auth.loginWithEmailAndPassword);
    
    //releate to course
    app.get('/api/student/:id/courses', controller.userData.StudentData.getAllCoursesJoined);

    //admin
    app.post('/api/admin', controller.userData.AdminData.createAdmin);

};