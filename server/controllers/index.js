const auth = require('./auth/auth');
const userData = require('./user');
const courseData = require('./course/course_data');
const paymentData = require('./payment/payment_data');
const scheduleData = require('./course_schedule_student');

module.exports = {
    auth,
    userData,
    courseData,
    paymentData,
    scheduleData
};
