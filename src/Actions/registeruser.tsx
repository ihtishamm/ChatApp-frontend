import axios from 'axios';

export const registerUser = async (formData: FormData) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

