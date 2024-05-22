const mongoose = require('mongoose');
const account = require('./account');
const uuid = require('uuid');

const teacherSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
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