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
