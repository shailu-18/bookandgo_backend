const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// Booking Schema
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  destination: String,
  date: String,
  guests: Number,
});


const Booking = mongoose.model("Booking", bookingSchema);

// CREATE
router.post("/api/bookings", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get("/api/bookings", async (req, res) => {
  try {
    const data = await Booking.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;