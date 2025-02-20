const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    managerName: {
        type: String,
        required: true
    },
    managerEmail: {
        type: String,
        required: true
    },
    managerPhone: {
        type: Number,
        required: true
    },
    managerPassword: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    }
});

const managerSchema = mongoose.model('manager', schema);

module.exports = managerSchema;