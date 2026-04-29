const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  email: String,
  message: String,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// CREATE
router.post("/", async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const data = await Feedback.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;