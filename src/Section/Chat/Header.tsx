import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HiChevronLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

import { ConversationSheet } from "@/components/Dialogs/ConversationSheet";
import { GroupSheet } from "@/components/Dialogs/GroupSheet";
import { Chat } from "@/Types/Chat";
import { useCurrentUser } from "@/hooks/useUserApi";
import { useSingleGroupDetails } from "@/hooks/useChat";
 
const Header = ({UserData, chatId}:{UserData:Chat, chatId:string}) => {

   const {data:user} = useCurrentUser();

   const {data:GroupDetails} = useSingleGroupDetails(chatId);
  const otherUser = UserData?.members.find(member => member._id !== user?._id);
  let isGroup = UserData?.groupChat;
    
   let isAdmin =  UserData?.creator === user?._id;
   console.log("isAdmin",isAdmin)
     
    const users = "online";
    const statusText = users === "online" ? "online" : "offline"
    return(
        <div className="
        bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm
        ">
            <div className="flex gap-3 items-center">
             <Link to="/" className="
              lg:hidden block text-sky-500 
               hover-text-sky-600 transition
               cursor-pointer
             "
             >
            <HiChevronLeft size={32}/>
             </Link>
              <Avatar className="w-[4rem] h-[4rem]">
                <AvatarImage src={otherUser?.avatar}/>
              </Avatar>
              <div className="flex flex-col"> 
                    <div>
                        <h1>{otherUser?.fullName}</h1>
                    </div>
                    <div className="text-sm font-light 
               text-neutral-500">
                {statusText}
               </div>
              </div>
            </div>
            {isGroup ? <GroupSheet isAdmin={isAdmin} groupDetails={GroupDetails}/> :
          <ConversationSheet userDetails={otherUser}/>
          }
        </div>
    )
}

export default Header