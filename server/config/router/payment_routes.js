const controller = require('../../controllers');

module.exports = (app) => {
    //for admin role
    app.get('/api/payment', controller.paymentData.getPayments);
    //for parent role
    app.get('/api/payment/:id', controller.paymentData.getPaymentsByParentId);
    app.post('/api/payment', controller.paymentData.createPayment);
    app.get('/api/payment/total-paid/:id', controller.paymentData.getTotalPaid);
};