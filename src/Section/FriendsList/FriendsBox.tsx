
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
const FriendsBox = ({data}: {data: any, }) => {

     console.log(data)
   

    return (
        <div
            className={clsx(`
                w-full relative flex items-center space-x-4 hover:bg-neutral-100 
                rounded-lg p-4 cursor-pointer transition
            `)}>
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

export default FriendsBox;
