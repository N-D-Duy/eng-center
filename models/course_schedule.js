const mongoose = require('mongoose');


const scheduleSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: 'Course is required'
    },
    date: {
        type: Date,
        required: 'Date is required'
    },
    start_time: {
        type: String,
        required: 'Start time is required'
    },
    end_time: {
        type: String,
        required: 'End time is required'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: 'Teacher is required'
    },
    status: {
        type: String,
        required: 'Status is required'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Schedule', scheduleSchema);