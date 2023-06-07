const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// dotenv configuration
require("dotenv").config();

const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sports Blitz camp is going on....");
});

app.listen(port, () => {
  console.log("Sports camp is running on port", port);
});
