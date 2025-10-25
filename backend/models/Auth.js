const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        default: "general"
    },
    date: {
        type: Date,
        default: Date.now
    },

    // recent notes (last 5-10 notes) for dashboard
    recentNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],

    // date-wise notes reference
    notesByDate: {
        type: Map,
        of: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
        default: {}
    }
});

module.exports = mongoose.model("User", UserSchema);
