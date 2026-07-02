const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// ======================
// SIGNUP
// ======================

router.post("/signup", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup Successful"
    });

  }

  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});


// ======================
// LOGIN
// ======================

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User not found"
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password"
      });

    }

    const token = jwt.sign(

      {
        id: user._id
      },

      "bookandgo",

      {
        expiresIn: "1d"
      }

    );

    res.status(200).json({

      message: "Login Successful",

      token,

      user

    });

  }

  catch (err) {

    res.status(500).json({

      message: err.message

    });

  }

});


// ======================
// FORGOT PASSWORD
// ======================

router.put("/reset-password", async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        message: "Email and Password are required"
      });

    }

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password updated successfully"
    });

  }

  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

module.exports = router;