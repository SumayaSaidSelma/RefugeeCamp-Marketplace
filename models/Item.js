

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isAvailable: { 
        type: Boolean, default: true 
    }
});

module.exports = mongoose.model('Item', itemSchema);

