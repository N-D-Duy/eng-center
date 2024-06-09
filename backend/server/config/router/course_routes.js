const controller = require('../../controllers')
module.exports = (app) => {

    app.get('/api/courses', controller.courseData.getAllCourses);
    app.get('/api/course/:id', controller.courseData.getCourseById);
    app.get('/api/courses/search', controller.courseData.findCourse);
    app.get('/api/courses/new', controller.courseData.getNewCourses);
    app.post('/api/course/students', controller.courseData.getAllStudentsInCourse);
    

    //for admin role
    app.put('/api/course/:id', controller.courseData.updateCourse);
    app.delete('/api/course/:id', controller.courseData.deleteCourse);
    app.post('/api/course', controller.courseData.createCourse);
    app.post('/api/course/join', controller.courseData.joinCourse);
    app.post('/api/course/leave', controller.courseData.leaveCourse);
};