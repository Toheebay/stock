

// server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import Item from "./models/Item.js";


import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import Item from "./models/Item.js"; // Make sure this file exists and exports the model


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors({

  origin: ["http://localhost:5173", "https://stock-2-nzro.onrender.com"],

  origin: ["http://localhost:5173", "https://your-frontend-domain.com"],

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

// ✅ Test DB route
app.post("/test-add", async (req, res) => {
  try {
    const newItem = await Item.create({
      name: "Laptopi",
      quantity: 1000,
      price: 799,
    });
    res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ Failed to connect to MongoDB:", err.message);
});

