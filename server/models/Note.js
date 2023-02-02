const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema(
    {
        /*user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            res: 'User'
        },*/
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: false
        },
        archived: {
            type: Boolean,
            default: false
        }
    }, 
    {
        timestamps: true // Created at and updated at
    }
)

module.exports = mongoose.model("Note", NoteSchema)