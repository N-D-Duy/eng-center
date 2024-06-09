const controller = require('../../controllers');

module.exports = (app) => {
    //for parent role
    app.get('/api/payment/total-paid/:id', controller.paymentData.getTotalPaid);
    app.get('/api/payment/:id', controller.paymentData.getPaymentsByParentId);
    app.post('/api/payment', controller.paymentData.createPayment);
    //for admin role
    app.get('/api/payments', controller.paymentData.getPayments);
};