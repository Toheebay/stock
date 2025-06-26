import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import Item from "./models/Item.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://stock-2-nzro.onrender.com"],
  credentials: true,
}));
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

// ✅ Test DB endpoint
app.get("/test-db", async (req, res) => {
  try {
    const items = await Item.find();
    res.json({ success: true, count: items.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to the API!");
});

// ✅ Connect MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
