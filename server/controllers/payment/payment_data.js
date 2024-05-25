const Payment = require('../../../models/payment.js');

const getPayments = async () => {
    try {
        const payments = await Payment.find();
        return payments;
    }
    catch (err) {
        return err.message;
    }
}

const getPaymentsByParentId = async (id) => {
    try {
        const payments = await Payment.find({ parentId: id });
        return payments;
    }
    catch (err) {
        return err.message;
    }
};

const createPayment = async (req, res) => {
    try {
        const payment = await Payment.create(req.body);
        return payment;
    } catch (error) {
        return error.message;
    }
};

const getTotalPaid = async (parentId) => {
    try {
        const payments = await Payment.find({ parentId: parentId });
        let total = 0;
        payments.forEach(payment => {
            total += payment.amount_paid;
        });
        return total;
    }
    catch (err) {
        return err.message;
    }
}

module.exports = {
    getPayments,
    getPaymentsByParentId,
    createPayment,
    getTotalPaid
};