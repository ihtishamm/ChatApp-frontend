
import { useQuery } from "@tanstack/react-query";
import { GetChatDetails, getMyChats } from "@/Actions/apis/Chat";
import { toast } from "react-toastify";

export const useMyChats = () => {
    const { data, isError, isFetching, isLoading } = useQuery({
      queryKey: ["myChats"],
      queryFn: getMyChats,
    });
  
    if (isError) {
      toast.error("Failed to fetch chats");
    }
  
    return { data, isFetching, isLoading };
  };


  export const useChatDetails = (chatId: string) => {
    const { data, isError, isFetching, isLoading } = useQuery({
      queryKey: ["chatDetails", chatId],
      queryFn: () => GetChatDetails(chatId),
    });
  
    if (isError) {
      toast.error("Failed to fetch chat details");
    }
  
    return { data, isFetching, isLoading };
  }