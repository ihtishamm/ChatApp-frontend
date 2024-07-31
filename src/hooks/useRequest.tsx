
import { useMutation, useQuery } from "@tanstack/react-query";
import { acceptFriendRequest, recieveFriendRequest, sendFriendRequest } from "@/Actions/apis/Request";

export const useSendRequest = () => {
  return useMutation({ mutationFn:(reqId:string) => sendFriendRequest(reqId) });
};

export const useRecieveRequest = () => {
  return useQuery({ queryKey: ["recieveRequest"], queryFn: recieveFriendRequest });
};

export const useAcceptRequest = () => {
  const {mutate}  = useMutation({
     mutationFn: (data: { requestId: string, accept: string }) => acceptFriendRequest(data)
     });
      return {mutate}
};