// server/routes/trip.routes.js
import express from "express";
import { generateTrip } from "../controllers/trip.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";


const router = express.Router();
router.post("/generate", isAuthenticated, generateTrip);

export default router;
