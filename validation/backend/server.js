const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors()); // ✅ allow frontend requests

function auth(req, res, next) {
  const a = true;

  if (a) {
    next();
  } else {
    res.status(401).send("Not Authenticated");
  }
}

app.get("/check", auth, (req, res) => {
  res.send("Authenticated");
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
