import { API_URL } from "@/constants";
import axios from "axios";
import Cookies from "universal-cookie";
function initAxiosWithAuthToken() {
  const instance = axios.create({
    baseURL: API_URL,
  });
  instance.interceptors.request.use(async (config) => {
    const cookies = new Cookies(null, { path: "/" });
    const token = cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  return instance;
}

const authAxios = initAxiosWithAuthToken();
export default authAxios;
