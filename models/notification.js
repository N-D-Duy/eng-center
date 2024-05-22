const mongoose = require('mongoose');
const uuid = require('uuid');

const notificationSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent',
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