import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMessages } from "@/Actions/apis/Messages"; // Adjust the path as needed

export const useGetMessages = (chatId: string, pageParam:number) => {
    const {data, fetchNextPage, fetchPreviousPage, isError, isFetching, isFetchingNextPage, isLoading} = useInfiniteQuery({
        queryKey: ["messages",  chatId ],
        queryFn: () => fetchMessages(chatId, pageParam),
        select: (data) => ({
            pages: [...data.pages].reverse(),
            pageParams: [...data.pageParams].reverse(),
          }),
          initialPageParam: 1,
            getNextPageParam: (lastPage) => {
                const nextPage = lastPage.page + 1;
                return nextPage;
            },

    })
     return {data, fetchNextPage, fetchPreviousPage, isError, isFetching,isLoading, isFetchingNextPage}
}

  