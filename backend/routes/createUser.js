const express = require("express");
const session = require('express-session');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { body, validationResult } = require("express-validator");
const secretKey = "Mynameishardik";
const app = express();

app.use(session({
  secret: '12345',
  resave: false,
  saveUninitialized: true,
}));


// Handle POST request to create a new user
router.post(
  "/createUser",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(409).json("User already exists,Login now");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      res.status(201).json(savedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Handle post request for login
router.post(
  "/loginUser",
  [
    // Validate request body
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Validate the password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const authToken = jwt.sign({ userId: user._id }, secretKey);
   
      // User authentication successful
      

      res.json({
        message: "Login successful",
        authToken: authToken,
        userId: user._id,
      });
   
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
