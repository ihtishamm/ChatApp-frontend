import { fetchMessages } from "@/Actions/apis/Messages";
import { useQuery } from "@tanstack/react-query";


export const useMessages = (chatId: string,page:number) => { 
  const { data, isLoading, isError, error ,isFetching} = useQuery({
    queryKey: ['messages', {chatId, page}],
    queryFn:() =>  fetchMessages({chatId, page}),
    enabled: !!chatId,
  });
  
  return { data, isLoading, isError, error,isFetching }
}
  
