import express from "express";
import { searchLocation } from "../controllers/location.controller.js";

const router = express.Router();

router.get("/search", searchLocation);

export default router; // ✅ Make this a default export
