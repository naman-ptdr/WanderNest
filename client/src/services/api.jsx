// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api/v1",
//   withCredentials: true,
// });

// export default API;

// export const searchLocation = (query) =>
//   API.get(`/location/search?q=${query}`); // ✅ FIXED: was `query=`, now `q=`



import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// ✅ Attach token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // token stored at login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

export const searchLocation = (query) =>
  API.get(`/location/search?q=${query}`);
