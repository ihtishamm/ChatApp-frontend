import { useParams } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import Header from "@/Section/Chat/Header";
import Body from "@/Section/Chat/Body";
import SendMessage from "@/Section/Chat/SendMessage";
import { getSocketConnection } from "@/context/SocketContext";


const Chat = () => {
    const params = useParams();

  console.log("params", params)
  const  socket = getSocketConnection();
  console.log("socket", socket.id)

    return (
        <div className="h-full h-screen lg:pl-80">
            <div className="h-full flex flex-col">
                <Header />
                <Body />
                <SendMessage />
            </div>
            
        </div>
    );
};

export default AppLayout()(Chat);
