import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

<<<<<<< HEAD
// ✅ Handles both routes
router.post("/signup", register);
=======
>>>>>>> 17a19d8 (Initial commit)
router.post("/register", register);
router.post("/login", login);

export default router;
