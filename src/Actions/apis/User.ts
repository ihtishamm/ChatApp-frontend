
import { axiosPrivate } from '../axois';
import { FriendResponse, Friend, User, UserResponse } from '@/Types/User';

export const getMyFriends = async (): Promise<Friend[]> => {
  try {
    const response = await axiosPrivate.get<FriendResponse>('/user/myFriends');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw new Error('Failed to fetch chats');
  }
};


export const SearchUsers = async (query: string): Promise<Friend[]> => {
    try {
        const response = await axiosPrivate.get<FriendResponse>(`/user/searchUser?fullName=${query}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching Users:', error);
        throw new Error('Failed to fetch Users');
    }
}

export const CurrentUser = async (): Promise<User> => {
    try {
        const response = await axiosPrivate.get<UserResponse>('/user/current');
        return response.data.data
    } catch (error) {
        console.error('Error fetching Users:', error);
        throw new Error('Failed to fetch Users');
    }
}