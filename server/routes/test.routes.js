import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/private", isAuthenticated, (req, res) => {
  res.json({
    message: "Access granted to private route",
    user: req.user,
  });
});

export default router;
