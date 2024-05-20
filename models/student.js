const mongoose = require('mongoose');
const account = require('./account');
const uuid = require('uuid');

const studentSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    parent_id: {
        type: String,
        required: 'Parent id is required'
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
        type: account.schema,
        required: 'Account is required'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);