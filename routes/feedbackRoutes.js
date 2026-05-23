const express=require("express");
const mongoose=require("mongoose");

const router=express.Router();

const feedbackSchema=
new mongoose.Schema({

email:String,
message:String,
rating:Number,
date:String

});

const Feedback=
mongoose.model(
"Feedback",
feedbackSchema
);


// CREATE

router.post("/",async(req,res)=>{

try{

const feedback=
new Feedback(req.body);

await feedback.save();

res.status(201).json(
feedback
);

}
catch(err){

res.status(500).json(err);

}

});


// GET

router.get("/",async(req,res)=>{

try{

const feedbacks=
await Feedback.find();

res.json(
feedbacks
);

}
catch(err){

res.status(500).json(err);

}

});


// UPDATE

router.put("/:id",async(req,res)=>{

try{

const updated=
await Feedback.findByIdAndUpdate(

req.params.id,
req.body,
{new:true}

);

res.json(updated);

}
catch(err){

res.status(500).json(err);

}

});


// DELETE

router.delete("/:id",async(req,res)=>{

try{

await Feedback.findByIdAndDelete(
req.params.id
);

res.json({
message:"Deleted"
});

}
catch(err){

res.status(500).json(err);

}

});

module.exports=router;