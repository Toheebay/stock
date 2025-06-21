// server.js or index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js"; // ⬅️ Import new routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());




// ✅ Root


import Item from "./models/Item.js"; // Make sure this path is correct

app.get("/test-db", async (req, res) => {
  try {
    const items = await Item.find(); // test a DB operation
    res.json({ success: true, count: items.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("🚀 Welcome to the API!");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes); // ⬅️ Mount the item routes

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("✅ Server running on port 5000"));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
