
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import  {startTransition} from "react";
const ConversationBox = ({data, selected}: {data: any, selected: boolean}) => {

    const navigate = useNavigate();

     console.log(data)
    const handleConversationClick = (id: any) => {
        startTransition(() => {
            navigate(`/chat/${id}`); // Navigate to the chat/:id route
          });
    };

    return (
        <div onClick={() => handleConversationClick(data?.id)}
            className={clsx(`
                w-full relative flex items-center space-x-4 hover:bg-neutral-100 
                rounded-lg p-4 cursor-pointer transition
            `,
            selected ? 'bg-neutral-100' : 'bg-white')}>
            <Avatar>
                <AvatarImage src={data?.avatar?.avatar} />
            </Avatar>
             <div className="min-w-0 flex-1">
                <div className="focus:outline-none">  
                   <div className="flex justify-between items-center mb-1 ">
                      <h1>{data?.name}</h1>
                   </div>
                </div>
             </div>
        </div>
    );
}

export default ConversationBox;
