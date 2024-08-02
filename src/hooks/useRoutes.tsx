import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { HiChat } from "react-icons/hi";
import { IoMdNotifications } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import useConversation from "./useConversation";

const useRoutes = (activeComponent:string,requestCount:number) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { conversationId } = useConversation();
   
  const routes = useMemo(() => [
    {
      label: "Conversations",
      icon: HiChat,
      active: activeComponent === "conversations",
      badge:undefined
    },
    {
      label: "Notifications",
      icon: IoMdNotifications,
      active: activeComponent === "notifications",
      badge:requestCount
    },
    {
      label: "Friends",
      icon: FaUserFriends,
      active: activeComponent === "friends",
      badge:undefined
      
    },
  ], [activeComponent, pathname, conversationId, requestCount]);

  return routes;
};

export default useRoutes;
