import axios from "axios";
import axiosInstance from "./axiosInstance";
import { REACT_APP_BASE_URL } from "../../extras/constants";

export async function loginUser(credentials, setUser) {
  try {
    const response = await axios.post(
      `${REACT_APP_BASE_URL}/user/login`,
      credentials
    );
    const token = response.data.token;
    localStorage.setItem("accessToken", token);
    axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    setUser({ token });
    return response.statusText;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function registerUser(credentials, setUser) {
  try {
    const response = await axios.post(
      `${REACT_APP_BASE_URL}/user/register`,
      credentials
    );
    const token = response.data.token;
    localStorage.setItem("accessToken", token);
    axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    await loginUser(credentials, setUser);
    return response.response.statusText;
  } catch (error) {
    console.log(error.response.data.msg);
    throw error.response.data.msg;
  }
}
