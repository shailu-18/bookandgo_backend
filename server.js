const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const bookingRoutes = require("./routes/bookingRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/feedbacks", feedbackRoutes);

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
console.log("MongoDB Connected");
})
.catch((err)=>{
console.log(err);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on ${PORT}`);
});