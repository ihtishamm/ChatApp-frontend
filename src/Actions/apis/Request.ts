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
    throw new Error('You have already sent Request to this user');
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

  export const acceptFriendRequest = async (data: { requestId: string; accept: string }) => {
    try {
        const response = await axiosPrivate.patch('/request/accept',data);
        return response.data
      } catch (error) {
        console.error('Error accepting Friend Request:', error);
        throw new Error('Failed to accept Friend Request');
      }
  }