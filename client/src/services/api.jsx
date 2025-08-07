import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

export default API;

export const searchLocation = (query) =>
  API.get(`/location/search?q=${query}`); // ✅ FIXED: was `query=`, now `q=`
