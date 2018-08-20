import axios from "axios";

const instance = axios.create({
  baseURL: "http://ssal.sparcs.org:16138"
});

instance.interceptors.request.use(req => req, error => Promise.reject(error));

export default instance;
