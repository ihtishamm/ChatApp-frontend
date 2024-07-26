
import { axiosPrivate } from '../axois';

export const fetchMessages = async ({pageParam}:{pageParam:number}) => {
    try{
        const response = await axiosPrivate.get(`message/669f997490db20718d39fe79?page=${pageParam}`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        throw new Error('Failed to fetch messages');
    }
};
