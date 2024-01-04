import axios from "axios";
import { REACT_APP_BASE_URL } from "../../extras/constants";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = REACT_APP_BASE_URL;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
