import axios from 'axios';

import { API_URL } from 'config';

const API = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  baseURL: API_URL,
});

export default API;
