import { RequestResponse, Request } from '@/Types/User';
import { axiosPrivate } from '../axois';

export const sendFriendRequest = async (reqId: string) => {
  try {
    const response = await axiosPrivate.patch('/request/send',{
        reqId  
    });
    return response.data
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw new Error('Failed to fetch chats');
  }
};


 export const recieveFriendRequest = async (): Promise<Request[]> => {
    try {
        const response = await axiosPrivate.get<RequestResponse>('/request/recieve');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching Request:', error);
        throw new Error('Failed to fetch  Request');
    }
  }