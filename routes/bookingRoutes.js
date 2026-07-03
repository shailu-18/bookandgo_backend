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
mongoose.model(
  "Booking",
  bookingSchema
);

router.delete("/:id", async(req,res)=>{

try{

await Booking.findByIdAndDelete(
req.params.id
);

res.json({
message:"Deleted successfully"
});

}
catch(err){

res.status(500).json({
message:err.message
});

}

});

// CREATE
router.post("/", async (req,res)=>{

try{

const booking=new Booking(req.body);

await booking.save();

res.status(201).json({
message:"Booking saved",
data:booking
});

}
catch(err){

res.status(500).json({
message:"Booking save failed",
error:err.message
});

}

});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const { email } = req.query;

    let data;

    if (email) {
      data = await Booking.find({ email });
    } else {
      data = await Booking.find();
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports=router;