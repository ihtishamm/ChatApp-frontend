
import { axiosPrivate } from '../axois';

export const fetchMessages = async ({chatId, page}:{page:number, chatId:string}) => {
    try{
        const response = await axiosPrivate.get(`message/${chatId}?page=${page}`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        throw new Error('Failed to fetch messages');
    }
};
