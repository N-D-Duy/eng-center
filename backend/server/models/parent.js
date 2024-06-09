const mongoose = require('mongoose');
const account = require('./account');


const parentSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    name: {
        type: String,
        required: 'Name is required'
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