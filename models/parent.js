const mongoose = require('mongoose');
const account = require('./account');
const uuid = require('uuid');

const parentSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: 'Account is required'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Parent', parentSchema);