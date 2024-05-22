const mongoose = require('mongoose');
const uuid = require('uuid');

//
const courseSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    name: {
        type: String,
        required: 'Name is required'
    },
    description: {
        type: String,
        required: 'Description is required'
    },
    category: {
        type: String,
        required: 'Category is required'
    },
    price: {
        type: Number,
        required: 'Price is required'
    },
    image: {
        type: String,
        required: 'Image is required'
    },
    grade: {
        type: Number,
        required: 'Grade is required'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: 'Teacher id is required'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);