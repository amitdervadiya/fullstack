const mongoose = require('mongoose')
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

})


const firstschema = mongoose.model('node-admin', schema)
module.exports = firstschema