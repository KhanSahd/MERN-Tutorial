const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1]; // Bearer token

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // decoded will be an object with the id. The id is in the token.

      // get user from the token
      req.user = await User.findById(decoded.id).select("-password"); // select("-password") will exclude the password from the response.

      // continue to next middleware
      next();
    } catch (error) {
      console.error(error);
      res.status(401); // Not authorized
      throw new Error("Not authorized, token failed"); // Throw an error
    }
  }

  // If there is no token
  if (!token) {
    res.status(401); // Not authorized
    throw new Error("Not authorized, no token"); // Throw an error
  }
});

module.exports = { protect };
