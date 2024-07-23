
import { useQuery } from "@tanstack/react-query";
import { getMyFriends } from "@/Actions/apis/User";
import { toast } from "react-toastify";

export const useMyFriends = () => {
    const { data, isError, isFetching } = useQuery({
      queryKey: ["myFriends"],
      queryFn: getMyFriends,
    });
  
    if (isError) {
      toast.error("Failed to fetch Friends");
    }
  
    return { data, isFetching };
  };