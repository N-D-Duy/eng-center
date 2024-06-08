const controller = require('../../controllers');
const cacheMiddleware = require('../../controllers/redis/cachedApi');

module.exports = (app) => {
    app.get('/api/schedule/student/:student', controller.scheduleData.getStudentSchedule);
    app.get('/api/schedule/teacher/:teacher', controller.scheduleData.getTeacherSchedule);
    app.get('/api/schedule/:id', controller.scheduleData.getSchedule);
    app.post('/api/schedule', controller.scheduleData.createSchedule);
};