const courseRoutes = require('./course_routes');
const userRoutes = require('./user_routes');
const paymentRoutes = require('./payment_routes');
const scheduleRoutes = require('./schedule_routes');

module.exports = (app) => {
    courseRoutes(app),
    userRoutes(app),
    paymentRoutes(app),
    scheduleRoutes(app)
};