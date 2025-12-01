const express = require("express")
const OpenAI = require("openai");
const dotenv = require("dotenv");

const router = express.Router()

router.post("/getDescription", async (req, res) => {
    try { 
        dotenv.config();
        const apiKey = process.env.GROQ_API_KEY;
        const { data } = req.body
        const client = new OpenAI({
            apiKey,
            baseURL: "https://api.groq.com/openai/v1",
        });

        const response = await client.responses.create({
            model: "openai/gpt-oss-20b",
            input: `Only Generate defintion of user query, And also remember answer in daouble coutes always and generate one anser not multiple ${data}`,
        });

        res.json(response.output_text)
    } catch (error) {
        console.log(error);

    }

})

module.exports = router

