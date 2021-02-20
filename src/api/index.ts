import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com'
});

api.interceptors.request.use(async (request) => {
  request.headers.Authorization = ``;
  return request;
});

export default api;