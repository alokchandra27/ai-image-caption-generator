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

  res.cookie("token", token);

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

  res.cookie("token", token);

  res.status(201).json({
    message: "User LoggedIn Successfully",
    user,
  });
}

module.exports = {
  registerUser,
  logInUser,
};
