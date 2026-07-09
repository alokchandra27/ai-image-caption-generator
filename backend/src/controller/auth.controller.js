const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { username, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    username: username,
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "Username already Exist",
    });
  }

  const user = await userModel.create({
    username: username,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
    httpOnly: true, // JS se cookie access nahi hogi (Security)
    secure: false, // Development mein false rakhein, Production (HTTPS) mein true
    sameSite: "lax", // Cross-origin requests ke liye "lax" ya "none" (agar secure: true ho)
    maxAge: 3600000, // 1 ghanta (ms mein)
  });
  res.status(201).json({
    message: "User Registered Successfully",
    user,
  });
}

async function logInUser(req, res) {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username: username,
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid Username",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
    httpOnly: true, // JS se cookie access nahi hogi (Security)
    secure: false, // Development mein false rakhein, Production (HTTPS) mein true
    sameSite: "lax", // Cross-origin requests ke liye "lax" ya "none" (agar secure: true ho)
    maxAge: 3600000, // 1 ghanta (ms mein)
  });

  res.status(200).json({
    message: "User LoggedIn Successfully",
    user,
  });
}

module.exports = {
  registerUser,
  logInUser,
};
