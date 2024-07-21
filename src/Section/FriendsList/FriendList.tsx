/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from "clsx"
import { useState } from "react"
import avatar from "@/assets/avatar.jpg"
import { IoPersonAddSharp } from "react-icons/io5"
import GroupModel from "@/components/GroupModel";
import FriendsBox from "./FriendsBox";

 

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
  

const FriendsList = () => {
    const [items] = useState(initialValues)
    const [isModleOpen, setIsModelOpen] = useState(false)
    return (
        <>
         <GroupModel isOpen={isModleOpen} onClose={() => setIsModelOpen(false)}/>
        <aside className={
            clsx(`fixed insert-y-0 pb-20 lg:pb:0 lg:left-20 lg:w-80 lg:block overflow-y-auto
                 border-r border-gray-200 w-full left-0
            `)
        }>
         <div className="px-5">
           <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-nautral-800">
                 Friends
            </div>
             <div
                    onClick={() => setIsModelOpen(true)}
                 className="rounded-full p-2 bg-gray-200 text-gray-600 cursor-pointer hover:opacity-75
                    transition">
                <IoPersonAddSharp size={20}/>
                </div>
           </div>
            {items.map((item) => (
                <FriendsBox
                    key={item.id} 
                    data={item}
                />
            ))}
         </div>
        </aside>
        </>
    )
}

export default FriendsList;