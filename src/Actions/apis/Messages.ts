
import { axiosPrivate } from '../axois';

export const fetchMessages = async ({chatId, pageParam}:{pageParam:number, chatId:string}) => {
    try{
        const response = await axiosPrivate.get(`message/${chatId}?page=${pageParam}`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        throw new Error('Failed to fetch messages');
    }
};

export const AttatchmentMessage = async (formData: FormData) => {
  const response = await axiosPrivate.post(`/message/attachments`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

