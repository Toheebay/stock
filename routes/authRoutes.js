// routes/auth.js

import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
  // handle registration
  res.send("Register endpoint");
});

router.post("/login", (req, res) => {
  // handle login
  res.send("Login endpoint");
});

export default router;
