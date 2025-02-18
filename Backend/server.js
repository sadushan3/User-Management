import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import EMP from "./routes/Emp.js";
import sign from "./routes/User.js";
import router from "./routes/passreset.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuration
const PORT = process.env.PORT || 2000;
const MONGO_URL = process.env.MONGO_URL;

// MongoDB Connection
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process if DB connection fails
  });

// Routes
app.use("/emp", EMP);
app.use("/sign", sign);
app.use("/router", router);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
