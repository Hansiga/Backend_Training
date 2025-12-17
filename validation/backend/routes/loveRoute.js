const express = require("express");
const router = express.Router();
const Love = require("../models/Love");

router.post("/love", async (req, res) => {
  try {
    const { username, season } = req.body;

    if (!username || !season) {
      return res.status(400).json({ message: "Missing data" });
    }

    const newLove = new Love({ username, season });
    await newLove.save();

    res.status(201).json({ message: "Loved season saved ❤️" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
