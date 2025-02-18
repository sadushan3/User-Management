import express from "express";
import { sendEmail } from "../helper/email.js";
import User from "../model/user.js"; // Import the user model

const router = express.Router();

router.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update the user's password
    user.password = password; // This triggers the pre('save') middleware to hash the password
    await user.save();

    // Send confirmation email
    await sendEmail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Confirmation",
      text: "Your password has been successfully reset.",
      html: "<p>Your password has been successfully reset.</p>",
    });

    res.status(200).json({ message: "Password reset successfully. Check your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while resetting the password." });
  }
});

export default router;
