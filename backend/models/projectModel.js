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
        type: Date
    },

    important: {
        type: Boolean,
        default: false
    },

    complete: {
        type: Boolean,
        default: false
    },

    project: {
        type: String,
        required: true
    }
})


const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    taskList: [taskSchema],

    user: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('project', projectSchema)