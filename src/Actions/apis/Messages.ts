
import { axiosPrivate } from '../axois';

export const fetchMessages = async ({chatId, pageParam=1}:{pageParam:number, chatId:string}) => {
    try{
        const response = await axiosPrivate.get(`message/${chatId}?page=${pageParam}`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        throw new Error('Failed to fetch messages');
    }
};
