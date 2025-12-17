const mongoose = require("mongoose");

const loveSchema = new mongoose.Schema({
  username: { type: String, required: true },
  season: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Love", loveSchema);
