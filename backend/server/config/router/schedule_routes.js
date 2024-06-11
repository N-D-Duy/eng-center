const controller = require('../../controllers');
const cacheMiddleware = require('../../controllers/redis/cachedApi');

module.exports = (app) => {
    app.get('/api/schedule/student/:id', controller.scheduleData.getStudentSchedule);
    app.get('/api/schedule/teacher/:id', controller.scheduleData.getTeacherSchedule);
    app.get('/api/schedule/:id', controller.scheduleData.getSchedule);
    app.post('/api/schedule', controller.scheduleData.createSchedule);
};