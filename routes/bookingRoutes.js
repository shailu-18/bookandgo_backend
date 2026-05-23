router.get("/",async(req,res)=>{

try{

const email=
req.query.email;

const data=
await Booking.find({
email:email
});

res.json(
data
);

}
catch(err){

res.status(500)
.json({
message:
err.message
});

}

});