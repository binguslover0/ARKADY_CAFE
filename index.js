const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema
const FormSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Form = mongoose.model("Form", FormSchema);

// Route
app.post("/submit", async (req, res) => {
  try {
    const data = new Form(req.body);
    await data.save();
    res.status(200).json({ message: "Saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));