import axios from 'axios';
import {getAccessToken} from './cookies';

// create an axios instance
const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000, // request timeout
});

// request interceptor
service.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      // if (token) {
      //   config.headers.Authorization = 'Bearer ' + token;
      // }
      return config;
    },
    (error) => Promise.reject(error),
);

// response interceptor
service.interceptors.response.use(
    (response) => response,
);

export default service;
