import { useAuth } from '@/context/AuthProvider';
import axios from 'axios';
import { useEffect } from 'react';




const BASE_URL =import.meta.env.VITE_BACKEND_URL;
        
export const axiosBase = axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    
    baseURL: BASE_URL,
    headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('site')}`,

     },
    withCredentials: true
});

const useAxiosPrivate = () => {
    const { token, refreshToken } = useAuth();
  
    useEffect(() => {
      const requestIntercept = axiosPrivate.interceptors.request.use(
        config => {
          if (!config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );
  
      const responseIntercept = axiosPrivate.interceptors.response.use(
        response => response,
        async (error) => {
          const prevRequest = error?.config;
          if (error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const newAccessToken = await refreshToken();
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          }
          return Promise.reject(error);
        }
      );
  
      return () => {
        axiosPrivate.interceptors.request.eject(requestIntercept);
        axiosPrivate.interceptors.response.eject(responseIntercept);
      };
    }, [token, refreshToken]);
  
    return axiosPrivate;
  };
  
  export default useAxiosPrivate;