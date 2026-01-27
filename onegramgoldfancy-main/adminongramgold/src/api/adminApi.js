import axios from "axios";

const BASE_URL = "http://https://onegramgoldfancy-main.onrender.com/api";

const adminApi = axios.create({
  baseURL: BASE_URL,
});

// attach token automatically
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken"); // or "token"
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAllOrders = async () => {
  const res = await adminApi.get("/orders");
  return res.data;
};
