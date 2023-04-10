const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // Destructuring the req.body object

  if (!name || !email || !password) {
    // If any of the fields are empty
    res.status(400); // Set the status to 400
    throw new Error("Please fill in all fields"); // Throw an error
  }

  // Check if the user already exists
  const userExist = await User.findOne({ email: email }); // Find the user by email

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10); // Generate a salt, 10 is the default amount
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password, pass in the password and the salt. This will return a hashed password

  // Create the user
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Destructuring the req.body object
  const user = await User.findOne({ email: email }); // Find the user by email

  if (user && (await bcrypt.compare(password, user.password))) {
    // If the user exists and the password matches
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400); // Set the status to 400
    throw new Error("Invalid credentials"); // Throw an error
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, email, name } = await User.findById(req.user.id); // Find the user by id

  res.status(200).json({
    _id: _id,
    name,
    email,
  });
});

// Generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  getMe,
};
