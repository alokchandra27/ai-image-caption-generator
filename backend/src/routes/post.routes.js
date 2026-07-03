const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/authmiddleware");
const createPostController = require("../controller/post.controller");
const multer = require("multer")

const upload = multer({ storage: multer.memoryStorage() });

/* POST /api/post [PROTECTED](image-file) */
router.post("/", 
    authMiddleware, /*req.user = userData */
    upload.single("image"), 
    createPostController);

module.exports = router;
