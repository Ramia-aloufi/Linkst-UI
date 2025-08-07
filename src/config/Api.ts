// const API_URL = 'http://localhost:8080/';

// src/api/api.ts
import axios, { AxiosError } from 'axios';
import type { ApiError } from '../model/ApiError';

// Optionally import your toast library (e.g. react-toastify)
// import { toast } from 'react-toastify';

const api = axios.create({
  baseURL:'http://localhost:8080/',
});

// Request Interceptor – Add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor – Handle global errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem('token');
      // toast.error('Session expired. Please log in again.');
      // window.location.href = '/login';
    } else if (status === 403) {
      //  window.location.href = '/login';
       localStorage.removeItem('token');
      // toast.error('You are not authorized to perform this action.');
    } else if (status === 500) {
      // toast.error('Server error. Please try again later.');
    } else if (error.response?.data?.message) {
      // toast.error(error.response.data.message);
    } else {
      // toast.error('An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

export default api;
