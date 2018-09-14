import axios from "axios";
import { baseURL } from "@/variables.js";

const instance = axios.create({
  baseURL: baseURL
});

instance.interceptors.request.use(req => req, error => Promise.reject(error));

export default instance;
