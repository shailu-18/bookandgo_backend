const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

require("dotenv").config();

const bookingRoutes=
require("./routes/bookingRoutes");

const feedbackRoutes=
require("./routes/feedbackRoutes");

const authRoutes=
require("./routes/authRoutes");

const app=express();

app.use(cors());

app.use(express.json());

mongoose.connect(
process.env.MONGO_URI
)
.then(()=>{
console.log(
"MongoDB Connected"
);
console.log("DB Name:", mongoose.connection.db.databaseName);
})
.catch((err)=>{
console.log(err);
});

app.use(
"/api/bookings",
bookingRoutes
);

app.use(
"/api/feedbacks",
feedbackRoutes
);

app.use(
"/api/auth",
authRoutes);

// test route
app.get("/",(req,res)=>{

res.send(
"Backend running"
);

});

const PORT=
process.env.PORT || 5000;

app.listen(PORT,()=>{

console.log(
`Server running on ${PORT}`
);

});