/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from "clsx"
import { FriendRequestDialog } from "@/components/Models/FriendModel"
import FriendsBox from "./FriendsBox";
import { useMyFriends } from "@/hooks/useUserApi";
import { ConversationListSkeleton } from "@/components/Skeltons/ConversationListSkelton";

const FriendsList = () => {
 const {data, isLoading} = useMyFriends()
    return (
        <>
        <aside className={
            clsx(`fixed insert-y-0 pb-20 lg:pb:0 lg:left-20 lg:w-80 lg:block overflow-y-auto
                 border-r border-gray-200 w-full left-0 h-[100vh]
            `)
        }>
         <div className="px-5">
           <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-nautral-800">
                 Friends
            </div>
               <FriendRequestDialog/>
           </div>
            {data?.length === 0 && ( <div className="text-gray-500  text-center mt-10">
            No friends
                </div>)}
           {isLoading ?  (
             <div className="space-y-4">
                <ConversationListSkeleton number={3}/>
                </div>
           ): data?.map((item) => (
                <FriendsBox
                    key={item._id} 
                    data={item}
                />
            ))}
         </div>
        </aside>
        </>
    )
}

export default FriendsList;