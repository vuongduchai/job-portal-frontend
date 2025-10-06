import axios from "axios";

// Thay bằng URL backend ASP.NET của bạn (ví dụ: http://localhost:5000 hoặc http://localhost:5099)
const API_BASE_URL = "http://localhost:5137/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm token (nếu có)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
