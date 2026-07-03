require("dotenv").config()
const express = require("express");
const connectToDB = require("./db/db");
const authRoutes = require("./routes/auth.routes")
const postRoutes = require("./routes/post.routes")
const cookieParser = require("cookie-parser")

const app = express();
connectToDB()
app.use(express.json());
app.use(cookieParser())


app.use("/api/auth",authRoutes)
app.use("/api/post",postRoutes)


module.exports = app