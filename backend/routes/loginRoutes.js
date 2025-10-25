const express = require("express")
const router = express.Router()
const User = require("../models/Auth")
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator")
const { route } = require("./notes")
const bcrypt = require("bcryptjs");
const fetchUser = require("../middlewares/fetchUser");


const JWT_SECRET = "inotebook"

//Route 1
router.post("/signup", async (req, res) => {
    const securePass = await bcrypt.hash(req.body.password, 10)

    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: securePass
    })
    const data = {
        user: {
            id: user.id
        }
    }

    const authToken = jwt.sign(data, JWT_SECRET)
    return res.json({ "success": true, authToken })
})

//Route 2
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Please try to Login With Correct Credential" })
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(400).json({ error: "Please try to Login With Correct Credential" })
        }
        const data = { user: { id: user.id } } 
        

        const authToken = jwt.sign(data, JWT_SECRET)
        return res.json({ "success": true, user, authToken })


    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error")
    }
})

//Route 3

router.post('/fetchUser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error")
    }
})

module.exports = router