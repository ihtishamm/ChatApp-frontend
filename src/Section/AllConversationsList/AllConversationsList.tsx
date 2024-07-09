/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from "clsx"
import { useState } from "react"
import avatar from "@/assets/avatar.jpg"
import { MdAdd, MdOutlineGroupAdd } from "react-icons/md"
import useConversation from "@/hooks/useConversation";
import ConversationBox from "./ConversationBox";
import GroupModel from "@/components/GroupModel";

 

const initialValues = [
    { id: 1, name: 'Alice Johnson', isGroup: false, avatar:{avatar} },
    { id: 2, name: 'Bob Smith', isGroup: false, avatar:{avatar} },
    { id: 3, name: 'Charlie Brown', isGroup: false, avatar:{avatar}},
    { id: 4, name: 'Development Team', isGroup: true, avatar:{avatar}},
    { id: 5, name: 'Emily Davis', isGroup: false,avatar:{avatar}},
    { id: 6, name: 'Finance Group', isGroup: true, avatar:{avatar}},
    { id: 7, name: 'Grace Lee', isGroup: false, avatar:{avatar} },
    { id: 8, name: 'Henry Wilson', isGroup: false, avatar:{avatar} },
    { id: 9, name: 'Marketing Team', isGroup: true, avatar:{avatar} },
    { id: 10, name: 'Olivia Harris', isGroup: false, avatar:{avatar} },
  ];
  


const ConversationsList = () => {
    const [items] = useState(initialValues)
    const [isModleOpen, setIsModelOpen] = useState(false)
    const {conversationId, isOpen} = useConversation()
    return (
        <>
         <GroupModel isOpen={isModleOpen} onClose={() => setIsModelOpen(false)}/>
        <aside className={
            clsx(`fixed insert-y-0 pb-20 lg:pb:0 lg:left-20 lg:w-80 lg:block overflow-y-auto
                 border-r border-gray-200 
            `, isOpen ? "hidden" : "block w-full left-0")
        }>
         <div className="px-5">
           <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-nautral-800">
                 Messages
            </div>
            
                <div className="rounded-full p-2 bg-gray-200 text-gray-600 cursor-pointer hover:opacity-75
                    transition
                "> 
                  <MdAdd size={20}/>
                </div>

                <div
                    onClick={() => setIsModelOpen(true)}
                 className="rounded-full p-2 bg-gray-200 text-gray-600 cursor-pointer hover:opacity-75
                    transition">
                <MdOutlineGroupAdd size={20}/>
                </div>
           </div>
            {items.map((item) => (
                <ConversationBox 
                    key={item.id} 
                    data={item}
                    selected={1 === item.id}
                />
            ))}
         </div>
        </aside>
        </>
    )
}

export default ConversationsList