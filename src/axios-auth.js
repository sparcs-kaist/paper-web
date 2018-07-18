import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://138.91.120.134:40400/',
});

instance.interceptors.request.use(req => req, error => Promise.reject(error));

export default instance;
