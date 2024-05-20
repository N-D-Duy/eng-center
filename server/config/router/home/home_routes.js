const homeController = require('../../../controllers/home_controller');

module.exports = (app) => {
    app.get('/api/course', homeController.getFullCourse);
    app.get('/api/course/:id', homeController.getCourseById);
    app.get('/api/course/search', homeController.findCourse);
    app.get('/api/course/:id/students', homeController.getAllStudentsInCourse);

    //for admin role
    app.put('/api/course/:id', homeController.updateCourse);
    app.delete('/api/course/:id', homeController.deleteCourse);
    app.post('/api/course', homeController.createCourse);
    app.get('/api/teacher', homeController.getAllTeachers);
};