const mongoose = require('mongoose');
const account = require('./account');
const uuid = require('uuid');

const studentSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent',
        required: false
    },
    cocc_percent:{
        type: Number,
        default: 0
    },
    tuition_due:{
        type: Number,
        default: 0
    },
    tuition_total: {
        type: Number,
        default: 0
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: 'Account is required'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);