

import ConversationsList from "@/Section/AllConversationsList/AllConversationsList";
import NotificationsList from "@/Section/Notifications/NotificationsList";
import FriendsList from "@/Section/FriendsList/FriendList";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
 import useMediaQuery from "@/hooks/useMediaQuery";
import { JSX } from "react/jsx-runtime";
import { useCallback, useState } from "react";
import { useSocketEvents } from "@/hooks/useSocketEvent";
import { getSocketConnection } from "@/context/SocketContext";
import { NEW_REQUEST } from "@/lib/constants";


 const AppLayout = () => (WrappedComponent: React.ComponentType) => {

    return (props: JSX.IntrinsicAttributes) => {
      const socket = getSocketConnection();
  const [newFriendRequest, setNewFriendRequest] = useState<number>(0);

   const newFriendRequestHandler =  useCallback(() => {
    setNewFriendRequest(prevCount => prevCount + 1);
   }, [])

  const eventHandler = { [NEW_REQUEST]: newFriendRequestHandler };

  useSocketEvents(socket, eventHandler);
        const [activeComponent, setActiveComponent] = useState<string>("conversations");
         const location = useLocation();
         const isMobile = useMediaQuery("(max-width: 768px)");
        const renderActiveComponent = () => {
            switch (activeComponent) {
              case "conversations":
                return <ConversationsList />;
              case "notifications":
                return <NotificationsList />;
                case "friends":
                return <FriendsList />;
              default:
                return <ConversationsList />;
            }
          };

          const isChatRoute = location.pathname.startsWith("/chat/");
        return (
            <> 
             <div className="flex h-full h-screen">
        {!(isChatRoute && isMobile) && (
          <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} requestCount={newFriendRequest}>
            {renderActiveComponent()}
          </Sidebar>
        )}
        <div className={`flex-1 ${isChatRoute ? '' : ""} h-full h-screen`}>
          <WrappedComponent {...props} />
        </div>
      </div>
            
        </>
        )
    }
 }

 export default AppLayout;