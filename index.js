const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const geminiRoutes = require("./routes/gemini");

const app = express();

// ✅ FIRST middleware
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

// ✅ THEN routes
app.use("/api/gemini", geminiRoutes);

app.get("/", (req, res) => {
  res.send("Server running ✅");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("API KEY:", process.env.GEMINI_API_KEY);

    app.listen(3000, () => {
      console.log("🚀 Server running on port 3000");
    });
  })
  .catch(err => console.log(err));