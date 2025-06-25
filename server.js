import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());

// ✅ CORS (allow frontend dev + deployed site)
app.use(
  cors({
    origin: ["http://localhost:5173", "https://stock-2-nzro.onrender.com"],
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Root route for sanity check
app.get("/", (req, res) => {
  res.send("API is running...");
});


console.log("🔑 MONGO_URI:", process.env.MONGO_URI);

// ✅ MongoDB connection and server start
console.log("🔁 Attempting MongoDB connection...");

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
    console.error("❌ Failed to connect to MongoDB:", err.message);
  });
