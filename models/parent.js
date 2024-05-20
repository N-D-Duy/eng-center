const mongoose = require('mongoose');
const account = require('./account');
const uuid = require('uuid');

const parentSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    account: {
        type: account.schema,
        required: 'Account is required'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Parent', parentSchema);