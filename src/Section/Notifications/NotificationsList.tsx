import React, { useState } from 'react';
import NotificationItem from './NotificationsItems';
import clsx from 'clsx';
import useConversation from '@/hooks/useConversation';
const NotificationsList: React.FC = () => {
    const {conversationId, isOpen} = useConversation()
    const [requests, setRequests] = useState([
        { id: '1', name: 'Alice Johnson' },
        { id: '2', name: 'Bob Smith' },
        { id: '3', name: 'Charlie Brown' },
    ]);

    const handleAccept = (id: string) => {
        // Logic to accept the friend request
        setRequests(requests.filter(request => request.id !== id));
    };

    const handleReject = (id: string) => {
        // Logic to reject the friend request
        setRequests(requests.filter(request => request.id !== id));
    };

    return (

        <aside className={
            clsx(`fixed insert-y-0 pb-20 lg:pb:0 lg:left-20 lg:w-80 lg:block overflow-y-auto
                 border-r border-gray-200 
            `, isOpen ? "hidden" : "block w-full left-0")
        }
          style={{height: "100vh"}}
          >
         <div className="px-5">
           <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-nautral-800">
                 Friend Requests
            </div>
           </div>
           {requests.length === 0 && (
               <div className="text-gray-500  text-center mt-10">
                   No friend requests
                   </div>
                   )}
           {requests.map(request => (
                <NotificationItem
                    key={request.id}
                    id={request.id}
                    name={request.name}
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            ))}
             
         </div>
        </aside>
        
    );
}

export default NotificationsList;
