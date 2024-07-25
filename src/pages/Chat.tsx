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


const Chat = () => {
    const [message, setMessage] = useState("");
    const params = useParams();
   const {data,  isLoading} = useChatDetails(params.id || "");

     const Members = data?.members || [];
  const  socket = getSocketConnection();

  const submitHandler = (e: React.FormEvent) => {

    e.preventDefault();
    if (message.trim() === "") return;
    socket.emit(NEW_MESSAGE, { chatId:params.id,members:Members, message});
    setMessage("");
    }
     const newMessageHandler = useCallback((data: any) => {
        console.log(data);
    } ,[]);

      useEffect(() => {
        socket.on(NEW_MESSAGE, newMessageHandler);
        return () => {
            socket.off(NEW_MESSAGE), newMessageHandler;
        };
    })

    return (
        <div className="h-full h-screen lg:pl-80">

            {isLoading ?  <Spinner/>: 
            <div className="h-full flex flex-col">
                <Header />
                <Body />
                <SendMessage message={message} setMessage={setMessage} submitHandler={submitHandler} />
            </div>
}
        </div>
    );
};

export default AppLayout()(Chat);
