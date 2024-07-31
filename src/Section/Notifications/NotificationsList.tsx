import React, { useEffect } from 'react';
import NotificationItem from './NotificationsItems';
import clsx from 'clsx';
import useConversation from '@/hooks/useConversation';
import { useRecieveRequest } from '@/hooks/useRequest';
import { ConversationListSkeleton } from '@/components/Skeltons/ConversationListSkelton';
import { useAcceptRequest } from '@/hooks/useRequest';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const NotificationsList: React.FC = () => {
  const { conversationId, isOpen } = useConversation();
  const { data, isLoading, isError } = useRecieveRequest();
  const queryClient = useQueryClient();
  const { mutate: acceptOrRejectRequest } = useAcceptRequest();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch friend requests");
    }
  }, [isError]);

    

  const handleAccept = (id: string) => {
        
    const acceptRequest = {
        requestId: id,
         accept: "accept"
      };


    acceptOrRejectRequest(acceptRequest,
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['recieveRequest'] });
          queryClient.invalidateQueries({ queryKey: ['myFriends'] });
          toast.success("Request accepted successfully");
        },
        onError: () => {
          toast.error(`Error accepting request`);
        },
      }
    );
  };

  const handleReject = (id: string) => {
    const rejectRequest = {
        requestId: id,
         accept: "reject"
      };

    acceptOrRejectRequest(rejectRequest,
      {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recieveRequest'] });
          toast.info("Request rejected");
        },
        onError: () => {
          toast.error(`Error rejecting request`);
        },
      }
    );
  };

  return (
    <aside
      className={clsx(
        `fixed insert-y-0 pb-20 lg:pb:0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`,
        isOpen ? "hidden" : "block w-full left-0"
      )}
      style={{ height: "100vh" }}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800">
            Friend Requests
          </div>
        </div>
        {data?.length === 0 && (
          <div className="text-gray-500 text-center mt-10">
            No friend requests
          </div>
        )}
        {isLoading && <ConversationListSkeleton number={2} />}
        {data?.map(request => (
          <NotificationItem
            key={request._id}
            id={request._id}
            name={request?.sender?.fullName}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        ))}
      </div>
    </aside>
  );
};

export default NotificationsList;
