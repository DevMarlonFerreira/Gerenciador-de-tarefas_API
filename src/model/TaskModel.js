const Mongoose = require('mongoose')

const TaskSchema = new Mongoose.Schema({
    macaddress: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    when: {
        type: Date,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
})
module.exports = Mongoose.model('Task', TaskSchema)