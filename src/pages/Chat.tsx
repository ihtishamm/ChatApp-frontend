import { useParams } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import Header from "@/Section/Chat/Header";
import Body from "@/Section/Chat/Body";
import SendMessage from "@/Section/Chat/SendMessage";
import { getSocketConnection } from "@/context/SocketContext";
import { useChatDetails } from "@/hooks/useChat";
import { Spinner } from "@/components/Custom/spinner";
import { useCallback, useEffect, useState } from "react";
import { NEW_MESSAGE } from "@/lib/constants";
import { useSocketEvents } from "@/hooks/useSocketEvent";
import { toast } from "react-toastify";


const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<string[]>([]);
    const params = useParams();
   const {data,  isLoading,isError } = useChatDetails(params.id || "");
   
   useEffect(() => {
    if(isError){
        toast.error("Failed to fetch chat details");
    }
    }, [isError])
   
     const Members = data?.members || [];
  const  socket = getSocketConnection();
 
  
  const submitHandler = (e: React.FormEvent) => {

    e.preventDefault();
    if (message.trim() === "") return;
    socket.emit(NEW_MESSAGE, { chatId:params.id,members:Members, message});
    setMessage("");
    }
     const newMessageHandler = useCallback((data) => {
        setMessages((prev) => [...prev, data.message]);
    } ,[]);

       const eventHandler={[NEW_MESSAGE]:newMessageHandler}

        useSocketEvents(socket, eventHandler)


    return (
        <div className="h-full h-screen lg:pl-80">

            {isLoading ?  <Spinner/>: 
            <div className="h-full flex flex-col">
                <Header />
                <Body messages={messages}/>
                <SendMessage message={message} setMessage={setMessage} submitHandler={submitHandler} />
            </div>
}
        </div>
    );
};

export default AppLayout()(Chat);
