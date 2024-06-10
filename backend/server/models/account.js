const mongoose = require('mongoose');
const uuid = require('uuid');

const accountSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    user_name: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    role: {
        type: String,
        required: 'Role is required'
    },
    status: {
        type: String,
        default: 'active'
    },
    email: {
        type: String,
        required: 'Email is required'
    },
    phone: {
        type: String,
        default: ""
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', accountSchema);