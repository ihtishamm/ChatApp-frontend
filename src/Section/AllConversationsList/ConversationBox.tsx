import { Avatar, AvatarImage } from "@/components/ui/avatar";
import avatar from "@/assets/avatar.jpg";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { startTransition } from "react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Chat } from "@/Types/Chat";
import AvatarGroup from "@/components/Custom/AvatarGroup";

const ConversationBox = ({ data, selected }: { data: Chat; selected: boolean }) => {
  const navigate = useNavigate();

  const handleConversationClick = (_id: string) => {
    startTransition(() => {
      navigate(`/chat/${_id}`); 
    });
  };


  return (
    <div
      onClick={() => handleConversationClick(data?._id)}
      className={clsx(
        `
        w-full relative flex items-center space-x-4 hover:bg-neutral-100 
        rounded-lg p-4 cursor-pointer transition overflow-y-auto
      `,
        selected ? "bg-neutral-300" : "bg-white"
      )}
    >
      {data?.groupChat ? (
        <AvatarGroup avatars={data.avatar} />
      ) : (
        <Avatar>
          <AvatarImage src={data.avatar[0]} />
          <AvatarFallback>{avatar}</AvatarFallback>
        </Avatar>
      )}

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1 ">
            <h1>{data?.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
