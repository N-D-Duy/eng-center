const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: 'Account is required'
    },
});

module.exports = mongoose.model('Admin', adminSchema);