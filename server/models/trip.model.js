// server/models/trip.model.js
import mongoose from "mongoose";

const TripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  input: { type: Object },
  plan: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Trip", TripSchema);
