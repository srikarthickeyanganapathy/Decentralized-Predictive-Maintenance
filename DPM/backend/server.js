require("dotenv").config();
const express = require("express");
const routes = require('./routes/DPMroutes');
const cors = require("cors");
const mongoose = require("mongoose");
// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

app.use("/api/v3", routes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});