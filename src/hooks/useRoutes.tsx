import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { HiChat } from "react-icons/hi";
import { IoMdNotifications } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import useConversation from "./useConversation";
import { useAuth } from "@/context/AuthProvider";

const useRoutes = () => {
     const { logOut } = useAuth();
    const location = useLocation();
    const pathname = location.pathname;
    const { conversationId } = useConversation();

      const friendRequests = 1;
    const routes = useMemo(() => [
        {
            label:"Chat",
            href:"/conversations",
            icon: HiChat,
            active: pathname === "/conversations" || !!conversationId
        },
        {
            label:"Notifications",
            href:"/notifications",
            icon: IoMdNotifications,
            active: pathname === "/notifications",
            badge: friendRequests > 0 ? friendRequests : undefined
        },
        {
            label:"Friends",
            href:"/friends",
            icon: FaUserFriends,
            active: pathname === "/friends"
        },

        {
            label:"Logout",
            href:"/",
            onClick: () => logOut(),
            icon: HiArrowLeftOnRectangle,
            active: pathname === "/"
        }

    ],[pathname, conversationId]);
    
     return routes;
}

export default useRoutes;