// server/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import locationRoutes from "./routes/location.routes.js";


dotenv.config();
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("WanderNest API is running");
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/location", locationRoutes);


// Start server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
