const express = require("express")
const router = express.Router()
const Note = require("../models/Notes")
const fetchUser = require("../middlewares/fetchUser")
const User = require("../models/Auth")

// Route 1
router.get("/fetchallnotes", fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error")
    }


})
router.get("/fetchRecentAddedNotes", fetchUser, async (req, res) => {
    try {
        // const notes = await Note.find({ user: req.user.id })
        const user = await User.findById(req.user.id)
            .populate({
                path: "recentNotes",
                select: "title createdAt tag description",
            })

        res.json(user.recentNotes)

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error")
    }


})

// Route 2
router.post("/addnote", fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const userId = req.user.id
        const note = await Note.create({
            user: userId,
            title,
            description,
            tag,
        });

        const today = new Date().toISOString().slice(0, 10);
        await User.findByIdAndUpdate(userId, {
            $push: {
                // Add note ID to today's date array
                [`notesByDate.${today}`]: note._id,
                // Add note ID to recentNotes array, keep only last 5
                recentNotes: { $each: [note._id], $slice: -5 }
            }
        });
        console.log("this is note", note);
        res.json([{ "Success": "Note Added", "type": "success" }, { "note": note }])



    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error")
    }


})

// Route 3 
router.put("/updatenote/:id", fetchUser, async (req, res) => {

    try {
        const { title, description, tag } = req.body
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send('not found') }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error")
    }


})


// Route 4 
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
    try {

        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send('not found') }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note deleted", "type": "success" })

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error")
    }


})





module.exports = router