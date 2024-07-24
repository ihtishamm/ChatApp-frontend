import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { HiChat } from "react-icons/hi";
import { IoMdNotifications } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import useConversation from "./useConversation";
import { useAuth } from "@/context/AuthProvider";

const useRoutes = (activeComponent:string) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { conversationId } = useConversation();
  const {requestCount} = useAuth()
   
  const routes = useMemo(() => [
    {
      label: "Conversations",
      icon: HiChat,
      active: activeComponent === "conversations"
    },
    {
      label: "Notifications",
      icon: IoMdNotifications,
      active: activeComponent === "notifications",
      badge: requestCount > 0 ? requestCount : undefined,
    },
    {
      label: "Friends",
      icon: FaUserFriends,
      active: activeComponent === "friends"
    },
  ], [activeComponent, pathname, conversationId]);

  return routes;
};

export default useRoutes;
