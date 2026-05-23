const express=require("express");
const mongoose=require("mongoose");

const router=express.Router();

const bookingSchema=new mongoose.Schema({

bookingId:String,
name:String,
email:String,
contact:String,
destination:String,
date:String,
duration:String,
adults:Number,
children:Number,
totalPrice:Number

});

const Booking=mongoose.model(
"Booking",
bookingSchema
);


// Create booking

router.post("/",async(req,res)=>{

try{

const booking=new Booking(req.body);

await booking.save();

res.status(201).json(
booking
);

}
catch(err){

res.status(500).json(err);

}

});


// Get bookings

router.get("/",async(req,res)=>{

try{

const bookings=
await Booking.find();

res.json(bookings);

}
catch(err){

res.status(500).json(err);

}

});

module.exports=router;