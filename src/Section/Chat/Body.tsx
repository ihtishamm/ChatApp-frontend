import { useEffect, useRef, useState } from "react"
import MessageBox from "./MessageBox";
import avatar from "@/assets/avatar.jpg"
const initialValues = [
    {
      id: 1,
      sender: 'Alice Johnson',
      content: 'Hey! How are you doing?',
      timestamp: '2024-06-12T10:00:00Z',
      avatar: {avatar},
    },
    {
      id: 2,
      sender: 'Bob Smith',
      content: 'I am doing well, thanks! How about you?',
      timestamp: '2024-06-12T10:02:00Z',
      avatar: {avatar},
    },
    {
      id: 1,
      sender: 'Alice Johnson',
      content: 'I am great, thanks for asking!',
      timestamp: '2024-06-12T10:03:00Z',
      avatar: {avatar},
    },
    {
      id: 1,
      sender: 'Bob Smith',
      content: 'What have you been up to lately?',
      timestamp: '2024-06-12T10:05:00Z',
      avatar: {avatar},
    },
    {
      id: 2,
      sender: 'Alice Johnson',
      content: 'Just working on some projects. You?',
      timestamp: '2024-06-12T10:06:00Z',
      avatar: {avatar},
    },
    {
      id: 1,
      sender: 'Bob Smith',
      content: 'Same here, just trying to keep busy.',
      timestamp: '2024-06-12T10:08:00Z',
      avatar: {avatar},
    },
  ];

  
const Body = ({messages}) => {

     useEffect(() => {  
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    ,[messages])

      const bottomRef =  useRef<HTMLDivElement>(null)
    const [message] = useState(initialValues)
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