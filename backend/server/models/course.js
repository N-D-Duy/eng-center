const mongoose = require('mongoose');

// Define the course schema
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
    status: {
        type: String,
        default: 'inactive'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        default: null
    },
    capacity: {
        type: Number,
        required: 'Capacity is required'
    },
    current_joined:{
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);