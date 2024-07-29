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
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import { useMessages } from "@/hooks/useMessages";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const { data, isLoading, isError } = useChatDetails(params.id || "");
  const {
    data: oldMessages,
    isError: messageError,
    isLoading: messageLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useMessages(params.id || "");

  console.log(
    "oldMessages",
    oldMessages?.pages.flatMap((page) => page?.data?.messages)
  );
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

  const allmessages = [
    ...(oldMessages?.pages.flatMap((page) => page?.data?.messages) || []),
    ...messages,
  ];

  return (
    <div className="h-full h-screen lg:pl-80">
      {messageLoading ? (
        <Spinner />
      ) : (
        <div className="h-full flex flex-col">
          <Header />
          <div
            id="scrollableDiv"
            style={{
              height: "100vh",
              overflow: "auto",
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            <InfiniteScroll
              dataLength={allmessages.length}
              next={fetchNextPage}
              hasMore={hasNextPage || false}
              inverse={true}
              style={{ display: "flex", flexDirection: "column-reverse" }}
              loader={<Spinner />}
              endMessage={<p className="text-center">Conversation Started!</p>}
              scrollableTarget="scrollableDiv"
            >
              <Body messages={allmessages} />
            </InfiniteScroll>
          </div>

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
