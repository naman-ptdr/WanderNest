import express from "express";
import {
  register,
  login,
  sendResetLink,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", sendResetLink);
router.post("/reset-password/:token", resetPassword);

export default router;
