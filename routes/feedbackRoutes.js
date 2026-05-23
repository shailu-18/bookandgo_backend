const express=require("express");
const mongoose=require("mongoose");

const router=express.Router();

const feedbackSchema=new mongoose.Schema({
email:String,
message:String,
rating:Number,
date:String
});

const Feedback=
mongoose.models.Feedback ||
mongoose.model(
"Feedback",
feedbackSchema
);

router.post("/",async(req,res)=>{

try{

const feedback=new Feedback(req.body);

await feedback.save();

res.status(201).json(feedback);

}
catch(err){

res.status(500).json({
message:"Failed to save feedback",
error:err.message
});

}

});

router.get("/",async(req,res)=>{

try{

const data=await Feedback.find();

res.json(data);

}
catch(err){

res.status(500).json(err);

}

});

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