const mongoose = require('mongoose');
const account = require('./account');
const uuid = require('uuid');

const teacherSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    course_id: {
        type: String,
        required: 'Course id is required'
    },
    account: {
        type: account.schema,
        required: 'Account is required'},
    session_count: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Teacher', teacherSchema);