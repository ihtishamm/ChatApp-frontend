import { useEffect, useRef } from "react";
import MessageBox from "./MessageBox";

const Body = ({ messages }) => {
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const bottomRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages?.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No messages yet</div>
      )}
      {messages.map((msg, i) => (
        <MessageBox
          key={msg._id}
          data={msg}
          isLast={i === messages.length - 1}
        />
      ))}
      <div ref={bottomRef} className="pt-16" />
    </div>
  );
};

export default Body;
