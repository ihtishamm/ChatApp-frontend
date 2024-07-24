
import {  useMutation, useQuery } from "@tanstack/react-query";
import { recieveFriendRequest, sendFriendRequest } from "@/Actions/apis/Request";

export const useSendRequest = () => {
    return  useMutation({mutationFn:sendFriendRequest})
  };

  export const useRecieveRequest = () => {
    return  useQuery({queryKey:["recieveRequest"],queryFn:recieveFriendRequest})
  }
