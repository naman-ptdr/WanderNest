// src/services/api.jsx

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

export default API; // ✅ Add this line

// You can still export functions too if needed
export const searchLocation = (query) =>
  API.get(`/location/search?query=${query}`);
