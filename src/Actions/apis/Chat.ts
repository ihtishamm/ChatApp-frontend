
import { axiosPrivate } from '../axois';
import { GetMyChatsResponse, Chat } from '@/Types/Chat';

export const getMyChats = async (): Promise<Chat[]> => {
  try {
    const response = await axiosPrivate.get<GetMyChatsResponse>('/chat/myChat');
    return response.data.data.transformedChat;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw new Error('Failed to fetch chats');
  }
};
