const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const bookingRoutes = require("./routes/bookingRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("Database:", mongoose.connection.db.databaseName);
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("✅ Backend Running");
});

// Test Reset Password Route
app.get("/test", (req, res) => {
  res.send("Server is Working");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});