
import { useMutation, useQuery} from "@tanstack/react-query";
import { CreateGroup, GetChatDetails, addMembers, getMyChats, removeMember } from "@/Actions/apis/Chat";
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
  
    return { data, isFetching, isLoading, isError };
  }

   export const useCreateGroup = () => {
    const {mutate, isPending, isSuccess, isError} = useMutation({
      mutationFn: (data: { name: string; members: string[] }) => CreateGroup(data)
    });
    return {mutate, isPending, isSuccess, isError}
  }

  export const useSingleGroupDetails = (chatId: string) => {
    const { data, isError, isFetching, isLoading } = useQuery({
      queryKey: ["singleGroupDetails", chatId],
      queryFn: () => GetChatDetails(chatId),
    });
  
    if (isError) {
      toast.error("Failed to fetch group details");
    }
  
    return { data, isFetching, isLoading };
  }

  export const useAddMembers = () => {
    const {mutate, isError,isPending}  = useMutation({
       mutationFn: (data: { chatId: string, members: string[] }) => addMembers(data)
       });
        return {mutate, isError, isPending}
  };


  export const useRemoveMembers = () => {
    const {mutate, isError, isPending}  = useMutation({
       mutationFn: (data: { chatId: string, userId: string}) => removeMember(data)
       });
        return {mutate, isError, isPending}
  };