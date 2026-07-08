const postModel = require("../models/posts.model");
const { generateCaption } = require("../services/ai.service");
const { v4: uuidv4 } = require("uuid");
const { uploadImageToImagekit } = require("../services/storage.service");

async function createPostController(req, res) {
  const file = req.file;
  console.log("file", file);

  const base64ImageFile = Buffer.from(file.buffer).toString("base64");

  const caption = await generateCaption(base64ImageFile);

  const response = await uploadImageToImagekit(file.buffer, `${uuidv4()}`);
  // res.status(201).json({
  //     caption:caption
  // })

  const post = await postModel.create({
    caption: caption,
    image: response.url,
    user: req.user._id,
  });

  res.status(201).json({
    message: "Post created successfullly",
    post: post,
  });
}

async function getAllPostsController(req, res) {
  const posts = await postModel
    .find()
    .populate("user", "username")
    .sort({ createdAt: -1 });

  res.status(200).json({
    message: "All posts fetched successfully",
    posts,
  });
}

module.exports = { createPostController, getAllPostsController };
