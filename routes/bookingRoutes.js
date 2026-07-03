const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const bookingSchema = new mongoose.Schema({
  bookingId: String,
  name: String,
  email: String,
  contact: String,
  date: String,
  destination: String,
  duration: String,
  adults: Number,
  children: Number,
  totalPrice: Number
});

const Booking =
  mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);

// CREATE BOOKING
router.post("/", async (req, res) => {

  try {

    const booking = new Booking(req.body);

    await booking.save();

    res.status(201).json(booking);

  } catch (err) {

    res.status(500).json({
      message: "Failed to save booking",
      error: err.message
    });

  }

});

// GET BOOKINGS
router.get("/", async (req, res) => {

  try {

    const email = req.query.email;

    let data;

    if (email) {

      data = await Booking.find({ email });

    } else {

      data = await Booking.find();

    }

    res.json(data);

  } catch (err) {

    res.status(500).json(err);

  }

});

// DELETE BOOKING
router.delete("/:id", async (req, res) => {

  try {

    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted"
    });

  } catch (err) {

    res.status(500).json(err);

  }

});

module.exports = router;