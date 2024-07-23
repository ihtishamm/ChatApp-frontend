
import { useQuery } from "@tanstack/react-query";
import { getMyChats } from "@/Actions/apis/Chat";
import { toast } from "react-toastify";

export const useMyChats = () => {
    const { data, isError, isFetching } = useQuery({
      queryKey: ["myChats"],
      queryFn: getMyChats,
    });
  
    if (isError) {
      toast.error("Failed to fetch chats");
    }
  
    return { data, isFetching };
  };