import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bible-api.com',
});

export default api;
