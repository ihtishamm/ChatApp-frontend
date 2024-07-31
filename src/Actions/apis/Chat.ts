
import { axiosPrivate } from '../axois';
import { GetMyChatsResponse, Chat, GetChatDetailsResponse } from '@/Types/Chat';

export const getMyChats = async (): Promise<Chat[]> => {
  try {
    const response = await axiosPrivate.get<GetMyChatsResponse>('/chat/myChat');
    return response.data.data.transformedChat;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw new Error('Failed to fetch chats');
  }
};


export const GetChatDetails = async (chatId: string): Promise<Chat> => {
  try {
    const response = await axiosPrivate.get<GetChatDetailsResponse>(`/chat/${chatId}`);
    return response.data.data.chat;
  } catch (error) {
    console.error('Error fetching chat details:', error);
    throw new Error('Failed to fetch chat details');
  }
}

   export const CreateGroup = async (data: { name: string; members: string[] }) => {
  try {
    const response = await axiosPrivate.post('/chat/createGroup', data);
    return response.data
  } catch (error) {
    console.error('Error creating group:', error);
    throw new Error('Failed to create group!');
  }
}