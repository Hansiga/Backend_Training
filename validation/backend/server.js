const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/seasonApp")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const loveRoute = require("./routes/loveRoute");
app.use("/api", loveRoute);

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});


