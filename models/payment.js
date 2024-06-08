const mongoose = require('mongoose');


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
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent',
        required: 'Parent id is required'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);