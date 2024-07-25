import { ChangeEvent } from "react";

interface MessageInputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }

const MessageInput:React.FC<MessageInputProps> = ({value, onChange}) => {
    return (
       <div className="relative w-full">
        <input placeholder="send the message...."
        className="text-black 
         font-light py-2 px-4 w-full rounded-full bg-neutral-200 focus:outline-none transition"
          value={value}
          onChange={onChange}
          type="text"
        />
       </div>
    )
}

export default MessageInput