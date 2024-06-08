const { default: mongoose } = require('mongoose');
const Payment = require('../../models/payment.js');

const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        return res.status(200).json({
            data: payments,
            message: 'Payments retrieved successfully'
        });
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

const getPaymentsByParentId = async (req, res) => {
    try {
        const { id} = req.query;
        const payments = await Payment.find({ id });
        return res.status(200).json({
            data: payments,
            message: 'Payments retrieved successfully'
        });
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const createPayment = async (req, res) => {
    try {
        const payment = await Payment.create(req.body);
        return res.status(201).json({
            data: payment,
            message: 'Payment created successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const getTotalPaid = async (req, res) => {
    try {
        const {id} = req.params;
        const payments = await Payment.find({ parent: id }).exec();
        let total = 0;
        payments.forEach(payment => {
            total += payment.amount_paid;
        });
        return res.status(200).json({
            data: total,
            message: 'Total paid retrieved successfully'
        });
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    getPayments,
    getPaymentsByParentId,
    createPayment,
    getTotalPaid
};