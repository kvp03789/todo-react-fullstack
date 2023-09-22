const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    details: {
        type: String
    },

    date: {
        type: String
    },

    important: {
        type: Boolean,
        default: false
    },

    project: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('task', taskSchema)