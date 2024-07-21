

import ConversationsList from "@/Section/AllConversationsList/AllConversationsList";
import NotificationsList from "@/Section/Notifications/NotificationsList";
import FriendsList from "@/Section/FriendsList/FriendList";
import Sidebar from "@/components/Sidebar/Sidebar";

import { JSX } from "react/jsx-runtime";
import { useState } from "react";


 const AppLayout = () => (WrappedComponent: React.ComponentType) => {
    return (props: JSX.IntrinsicAttributes) => {
        const [activeComponent, setActiveComponent] = useState<string>("conversations");

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
        return (
            <> 
            <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} >
                   {renderActiveComponent()}
                <div className="h-full h-screen">
                <WrappedComponent {...props} />
            </div>
            </Sidebar>
            
        </>
        )
    }
 }

 export default AppLayout;