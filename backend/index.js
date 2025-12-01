const express = require("express");
const connectMongo = require("./connection");
const Routes = require("./routes/notes")
const routes = require("./routes/loginRoutes")
const aiRoutes = require("./routes/ai")
const cors = require("cors")


connectMongo();
const app = express();
app.use(express.json())
app.use(cors())


//Routes
app.use("/note", Routes)
app.use("/auth", routes)
app.use("/ai", aiRoutes)

app.listen(3000, () => {
    console.log("http://localhost:3000/");
});
