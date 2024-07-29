import { fetchMessages } from "@/Actions/apis/Messages";
import { useInfiniteQuery } from "@tanstack/react-query";


export const useMessages = (chatId: string) => { 
  const { data, isLoading, isError, error ,isFetching, hasNextPage, fetchNextPage} = useInfiniteQuery({
    queryKey: ['messages', {chatId}],
    queryFn:() =>  fetchMessages({chatId, pageParam:1}),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,

    enabled: !!chatId,
  });
  
  return { data, isLoading, isError, error,isFetching, hasNextPage, fetchNextPage}; 
  
}
  
