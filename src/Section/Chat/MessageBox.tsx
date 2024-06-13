
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import clsx from "clsx"
import moment from "moment"
const MessageBox = ({data}) => {
    console.log(data)
 const isOpen = data.id === 1
     const container = clsx("flex gap-3 p-4",
        isOpen && "justify-end"
     )

      const  avatar = clsx(isOpen && "order-2")
      const  body =  clsx("flex flex-col gap-2",
        isOpen && "items-end"
      )

       const message = clsx("text-lg w-fit overflow-hidden",
        isOpen ? "bg-sky-500 text-white" : "bg-neutral-100",
        "rounded-lg p-3 shadow-sm"
       )
    return (
        <div className={container}>

            <div className={avatar}>
             <Avatar>
                <AvatarImage src={data?.avatar?.avatar}/>
             </Avatar>
                </div>
                <div className={body}>
                    <div className="flex items-center gap-1">
                        <div text-sm text-gray-500>
                            { data.sender}
                            </div> 
                            <div className="text-xs text-gray-400">
                            {moment(data.timestamp).format('h:mm A')} 
                            </div>
                    </div>
                    <div className={message}>
                      {data.content}
                    </div>
                    </div>
        </div>
    )
}

export default MessageBox