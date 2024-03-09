import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  config.headers["token"] = token;

  return config;
});

axiosInstance.interceptors.response.use((response) => {
  if (response?.data?.status == 401) {
    localStorage.clear();
    window.location.href = "/login";
  }
  return response;
});

export default axiosInstance;
