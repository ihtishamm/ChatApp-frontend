import { fetchMessages } from "@/Actions/apis/Messages";
import { useQuery } from "@tanstack/react-query";


export const useMessages = (chatId: string,page:number) => {
  const {data, isError, isFetching, isLoading} = useQuery({
    queryKey: ["messages", { chatId }],
    queryFn:()  => fetchMessages({ chatId, pageParam: page }),
  
  });
  return {data, isError, isFetching, isLoading}

  }
  
