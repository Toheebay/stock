// models/Item.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
