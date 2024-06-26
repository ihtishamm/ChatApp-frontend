import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { HiChat } from "react-icons/hi";
import { BiNotification } from "react-icons/bi";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import useConversation from "./useConversation";


const useRoutes = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const { conversationId } = useConversation();

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
            icon: BiNotification,
            active: pathname === "/notifications"
        },
        {
            label:"Friends",
            href:"/friends",
            icon: BiNotification,
            active: pathname === "/friends"
        },

        {
            label:"Logout",
            href:"/",
            onClick: () => {},
            icon: HiArrowLeftOnRectangle,
            active: pathname === "/logout"
        }

    ],[pathname, conversationId]);
    
     return routes;
}

export default useRoutes;