
import {  useMutation } from "@tanstack/react-query";
import { sendFriendRequest } from "@/Actions/apis/Request";

export const useSendRequest = () => {
    return  useMutation({mutationFn:sendFriendRequest})
  };
