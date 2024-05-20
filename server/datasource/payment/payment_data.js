const Payment = require('../../models/payment.js');

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