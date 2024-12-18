import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HiChevronLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

import { ConversationSheet } from "@/components/Dialogs/ConversationSheet";
import { GroupSheet } from "@/components/Dialogs/GroupSheet";
import { Chat } from "@/Types/Chat";
import { useCurrentUser } from "@/hooks/useUserApi";
import { useSingleGroupDetails } from "@/hooks/useChat";
import AvatarGroup from "@/components/Custom/AvatarGroup";
 
const Header = ({UserData, chatId}:{UserData:Chat, chatId:string}) => {

   const {data:user} = useCurrentUser();

   const {data:GroupDetails} = useSingleGroupDetails(chatId);
  const otherUser = UserData?.members.find(member => member._id !== user?._id);
  const isGroup = UserData?.groupChat;
    const SelectedGroupmembers = UserData?.members?.slice(0,3).map(member => member.fullName).join(", ");
    
   const isAdmin =  UserData?.creator === user?._id;
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
             {
              isGroup ? (
                <>
                <div>
                <AvatarGroup avatars={UserData?.members?.map(avatar => avatar.avatar)}/>
                </div>
                <div className="flex flex-col"> 
                    <div>
                        <h1 className="text-lg">{UserData?.name}</h1>
                    </div>
                    <div className="text-sm font-light 
               text-neutral-500">
                    {UserData?.members?.length > 3 ? `${SelectedGroupmembers} and more`: SelectedGroupmembers}
               </div>
                </div>
                </>
              ):(
                <>
                <Avatar className="w-[3rem] h-[3rem]">
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
               </>
              )
             }
    



             
            </div>
            {isGroup && GroupDetails ? <GroupSheet isAdmin={isAdmin} groupDetails={GroupDetails}/> :
          <ConversationSheet userDetails={otherUser} chatId={UserData?._id}/>
          }
        </div>
    )
}

export default Header