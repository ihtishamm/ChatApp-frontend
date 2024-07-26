import { useEffect, useRef, useState } from "react"
import MessageBox from "./MessageBox";
 
const Body = ({messages}) => {

     useEffect(() => {  
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    ,[messages])

      const bottomRef =  useRef<HTMLDivElement>(null)
    
    return (
        <div className="flex-1 overflow-y-auto">
         {messages.map((msg,i) => (
              <MessageBox key={msg._id} data={msg} isLast={i === messages.length -1} />
         ))}
            <div ref={bottomRef} className="pt-16"/> 
        </div>
    )
}

export default Body