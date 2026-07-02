require("dotenv").config()
const express = require("express");
const connectToDB = require("./db/db");
const authRoutes = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")

const app = express();
connectToDB()
app.use(express.json());


app.use("/api/auth",authRoutes)


module.exports = app