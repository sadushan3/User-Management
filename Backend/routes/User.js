import express from "express";
import dotenv from "dotenv";
import User from "../model/user.js";

dotenv.config();
const sign = express.Router();

// Register Route
sign.post("/register", async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;

  // Input Validation
  if (!username || !email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or Username already exists" });
    }

    // Create and save the new user
    const newUser = new User({ username, email, password, firstName, lastName });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in /register:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login Route
sign.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Input Validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Success response
    res.status(200).json({
      message: "Login successful",
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default sign;
