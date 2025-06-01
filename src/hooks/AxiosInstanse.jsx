import axios from 'axios';
import { BASEURL } from "@component/apiendpoints/api"; // Import your BASEURL from your api configuration
import Cookies from "js-cookie"

// Create an axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: BASEURL, // Set the base URL
  headers: {
    'Content-Type': 'application/json', // Set default content type to JSON
    // You can add more headers here if needed (e.g., Authorization token)
    
  },
  timeout: 5000, // Set the request timeout (in milliseconds)
});

// Add interceptors for request and response (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add additional logic here before the request is sent
    // For example, you can attach an authorization token if you have one:
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request error
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response here if needed
    return response;
  },
  (error) => {
    // Handle response errors (e.g., logging out user on 401, etc.)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., log out user)
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
