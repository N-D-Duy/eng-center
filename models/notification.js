const mongoose = require('mongoose');
const uuid = require('uuid');

const notificationSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    parent_id: {
        type: String,
        required: 'User id is required'
    },
    message: {
        type: String,
        required: 'Message is required'
    },
    status: {
        type: String,
        default: 'unread'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);