import { useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import { BodyProps } from "@/Types/Chat";

const Body: React.FC<BodyProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages?.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No messages yet</div>
      )}
      {messages.map((msg) => (
        <MessageBox key={msg._id} data={msg} />
      ))}
      <div ref={bottomRef} className="pt-16" />
    </div>
  );
};

export default Body;
