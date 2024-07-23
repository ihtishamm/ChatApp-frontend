/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from "clsx"
import { useState } from "react"
import { MdOutlineGroupAdd } from "react-icons/md"
import useConversation from "@/hooks/useConversation";
import ConversationBox from "./ConversationBox";
import GroupModel from "@/components/Models/GroupModel";
import { useQuery } from "@tanstack/react-query";
import { getMyChats } from "@/Actions/apis/Chat";
import { toast } from "react-toastify";
import { ConversationListSkeleton } from "@/components/Skeltons/ConversationListSkelton";

 
;
  


const ConversationsList = () => {
    const [isModleOpen, setIsModelOpen] = useState(false)
    const {conversationId, isOpen} = useConversation()


     const  {data, isError, isFetching} = useQuery({
        queryKey: ['myChats'],
        queryFn: getMyChats
    });
         
     
      isError && toast.error("Failed to fetch chats")

    return (
        <>
         <GroupModel isOpen={isModleOpen} onClose={() => setIsModelOpen(false)}/>
        <aside className={
            clsx(`fixed insert-y-0 pb-20 lg:pb:0 lg:left-20 lg:w-80 lg:block overflow-y-auto 
                 border-r border-gray-200  h-[100vh]
            `, isOpen ? "hidden" : "block w-full left-0")
        }>
         <div className="px-5">
           <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-nautral-800">
                 Messages
            </div>
                  <div
                    onClick={() => setIsModelOpen(true)}
                 className="rounded-full p-2 bg-gray-200 text-gray-600 cursor-pointer hover:opacity-75
                    transition">
                <MdOutlineGroupAdd size={20}/>
                </div>
           </div>

            { isFetching ? <ConversationListSkeleton number={data?.length || 0}/> :  data?.map((item) => (
                <ConversationBox 
                    key={item._id} 
                    data={item}
                    selected={conversationId == item._id}
                />
            ))}
         </div>
        </aside>
        </>
    )
}

export default ConversationsList