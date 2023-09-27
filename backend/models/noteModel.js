const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    body: {
        type: String,
        required: true
    },

    user: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("note", noteSchema)