
import axios from 'axios';




const BASE_URL =import.meta.env.VITE_BACKEND_URL;
        
export const axiosBase = axios.create({
    baseURL: BASE_URL
});

 export const axiosPrivate = axios.create({
    
    baseURL: BASE_URL,
    headers: { 
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('site')}`,

     },
    withCredentials: true
});
 
axiosPrivate.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('site');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
// Add a response interceptor
axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the token has expired and we need to refresh it
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await axiosPrivate.post('/user/refreshToken', { refreshToken });
          const { token } = response.data;
  
          localStorage.setItem('site', token);
  
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (error) {
          // Handle refresh token error or redirect to login
        }
      }
  
      return Promise.reject(error);
    }
  );
  
 