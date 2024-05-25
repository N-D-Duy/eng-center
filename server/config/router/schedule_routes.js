const controller = require('../../controllers');

module.exports = (app) => {
    app.get('/api/schedule', controller.scheduleData.getScheduleInfo);
};