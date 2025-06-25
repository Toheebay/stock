import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// ✅ Handles both routes
router.post("/signup", register);
router.post("/register", register);
router.post("/login", login);

export default router;
