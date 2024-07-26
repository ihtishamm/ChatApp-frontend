import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMessages } from "@/Actions/apis/Messages"; // Adjust the path as needed

export const useGetMessages = () => {
    
    const {
        data,
        status,
        error,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
      } = useInfiniteQuery({
        queryKey: ['todos'],
        queryFn: fetchMessages,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = lastPage.length ? allPages.length + 1 : undefined;
          return nextPage;
        },

    })
     return {data, fetchNextPage,status,error,hasNextPage, isFetchingNextPage}
}

  