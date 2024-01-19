import axios from "axios";
import { API_URL } from "../utils";

const api = axios.create({
  baseURL: API_URL,
  retryDelay: 3000,
  retry: 3,
});

export default api;
