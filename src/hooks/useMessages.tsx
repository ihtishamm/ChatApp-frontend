import { AttatchmentMessage, fetchMessages } from "@/Actions/apis/Messages";
import { useMutation, useQuery } from "@tanstack/react-query";


export const useMessages = (chatId: string,page:number) => {
  const {data, isError, isFetching, isLoading} = useQuery({
    queryKey: ["messages", { chatId }],
    queryFn:()  => fetchMessages({ chatId, pageParam: page }),
  
  });
  return {data, isError, isFetching, isLoading}

  }
  

   export const useSendAttachment = () => {
    const {mutate, data, isPending, isSuccess, isError} = useMutation({
       mutationFn: (formData:FormData) => AttatchmentMessage(formData)
    }
    );
    return {mutate, isPending, isSuccess, isError, data}
   }