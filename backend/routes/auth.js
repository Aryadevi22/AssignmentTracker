const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send("Signup successful!");
  } catch (err) {
    res.status(400).send("Error signing up: " + err.message);
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Invalid password!");

    res.send("Login successful!");
  } catch (err) {
    res.status(500).send("Error logging in: " + err.message);
  }
});

module.exports = router;
