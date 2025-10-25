const mongoose = require("mongoose")


const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "general"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

NoteSchema.index({ user: 1, createdAt: -1 });
module.exports = mongoose.model("Note", NoteSchema)