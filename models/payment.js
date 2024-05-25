const mongoose = require('mongoose');
const uuid = require('uuid');

const paymentSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    course_student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseStudent',
        required: 'Course id is required'
    },
    amount_paid: {
        type: Number,
        required: 'Amount is required'
    },
    status: {
        type: String,
        default: 'pending'
    },
    payment_method: {
        type: String,
        required: 'Payment method is required'
    },
    payment_date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);