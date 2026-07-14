require("dotenv").config()
const express = require("express");
const connectToDB = require("./db/db");
const authRoutes = require("./routes/auth.routes")
const postRoutes = require("./routes/post.routes")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const corsOptions = {
  origin: "https://ai-image-caption-generator-phi.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies to be sent
};

const app = express();
connectToDB()
app.use(express.json());
app.use(cookieParser())
app.use(cors(corsOptions)) // Use the CORS middleware 


app.use("/api/auth",authRoutes)
app.use("/api/post",postRoutes)


module.exports = app