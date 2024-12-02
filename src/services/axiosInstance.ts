import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CV_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem("token") as string;


if (token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}