import { useParams } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import Header from "@/Section/Chat/Header";
import Body from "@/Section/Chat/Body";
import SendMessage from "@/Section/Chat/SendMessage";
import { getSocketConnection } from "@/context/SocketContext";
import { useChatDetails } from "@/hooks/useChat";
import { Spinner } from "@/components/Custom/spinner";
import { useCallback, useEffect, useRef, useState } from "react";
import { NEW_MESSAGE } from "@/lib/constants";
import { useSocketEvents } from "@/hooks/useSocketEvent";
import { toast } from "react-toastify";
import { useMessages } from "@/hooks/useMessages";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const params = useParams();
  const { data, isLoading, isError } = useChatDetails(params.id || "");

  const {
    data: oldMessages,
    isError: messageError,
    isLoading: messageLoading,
    isFetching,
  } = useMessages(params.id || "", page)

 
  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch chat details");
    }
  }, [isError]);

  const Members = data?.members || [];
  const socket = getSocketConnection();

  useEffect(() => {
    setMessages([]);
  }, [params.id]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;
    socket.emit(NEW_MESSAGE, { chatId: params.id, members: Members, message });
    setMessage("");
  };
  const newMessageHandler = useCallback(
    (data) => {
      if (data.chatId === params.id) {
        setMessages((prev) => [...prev, data.message]);
      }
    },
    [params.id]
  );

  const eventHandler = { [NEW_MESSAGE]: newMessageHandler };

  useSocketEvents(socket, eventHandler);

  const allmessages = [ ...oldMessages?.data?.messages || [], ...messages];

  return (
    <div className="h-full h-screen lg:pl-80">
      {messageLoading  || isFetching ? (
        <Spinner />
      ) : (
        <div className="h-full flex flex-col">
          <Header  UserData={data}/>
            
           <Body messages={allmessages} />
            

          <SendMessage
            message={message}
            setMessage={setMessage}
            submitHandler={submitHandler}
          />
        </div>
      )}
    </div>
  );
};

export default AppLayout()(Chat);
