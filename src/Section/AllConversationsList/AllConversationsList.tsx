/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from "clsx"
import useConversation from "@/hooks/useConversation";
import ConversationBox from "./ConversationBox";
 import { useMyChats } from "@/hooks/useChat";
import { ConversationListSkeleton } from "@/components/Skeltons/ConversationListSkelton";
import { NewGroupDialog } from "@/components/Models/newGroupModel";

  


const ConversationsList = () => {
    const {conversationId, isOpen} = useConversation()
    const {data, isFetching, isLoading} = useMyChats()

    return (
        
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
                 <NewGroupDialog/>
           </div>
           {data?.length === 0 && ( <div className="text-gray-500  text-center mt-10">
            Add Friends to start a conversation!
                </div>)}
           {isLoading ?  (
             <div className="space-y-4">
                <ConversationListSkeleton number={3}/>
                </div>
           ): 
              data?.map((item) => (
                <ConversationBox 
                    key={item._id} 
                    data={item}
                    selected={conversationId == item._id}
                />
             ))}
         </div>
        </aside>
        
    )
}

export default ConversationsList