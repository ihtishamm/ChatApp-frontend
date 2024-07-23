
import {  useQuery } from "@tanstack/react-query";
import { getMyFriends, SearchUsers } from "@/Actions/apis/User";
import { toast } from "react-toastify";

export const useMyFriends = () => {
    const { data, isError, isFetching, isLoading } = useQuery({
      queryKey: ["myFriends"],
      queryFn: getMyFriends,
    });
  
    if (isError) {
      toast.error("Failed to fetch Friends");
    }
  
    return { data, isFetching, isLoading };
  };


    export const useSearchUsers = (query:string) => {
        const { data, isError, isFetching, isLoading } = useQuery({
          queryKey: ["searchUsers",{query}],
          queryFn: () => SearchUsers(query),
        });
      
        if (isError) {
          toast.error("Failed to fetch Users");
        }
      
        return { data, isFetching, isLoading };
      }