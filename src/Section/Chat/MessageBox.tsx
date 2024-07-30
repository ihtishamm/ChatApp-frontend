import { Avatar, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import moment from "moment";
import { useAuth } from "@/context/AuthProvider";
import { FaFileAlt } from "react-icons/fa";
import { ImageChange, fileFormat } from "@/lib/helper";

const MessageBox = ({ data }) => {;
  const { user } = useAuth();
  const isOwn = data?.sender?._id === user?._id;

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-lg w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-neutral-100",
    "rounded-lg p-3 shadow-sm"
  );

  const renderAttachment = (attachment:any) => {

     
    const { url, filename } = attachment;
    const file =   fileFormat(url);

    if (file === "image") {
      const newUrl = ImageChange(url, 300);
      return <img src={newUrl} alt={filename} className="max-w-xs max-h-60 rounded-lg" />;
    } else if (file === "video") {
      return (
        <video  src={url} controls  className="max-w-xs max-h-60 rounded-lg" preload="none"/>
      );
    } else if (file === "audio") {
      return <audio controls src={url} className="w-full" />;
    } else  if(file === "file") {
      return (
        <div className={message}>
        <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
          <FaFileAlt size={24} />
          {filename}
        </a>
        </div>
      );
    }
  };

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar>
          <AvatarImage src={data?.sender?.avatar} />
        </Avatar>
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data?.sender?.fullName}</div>
          <div className="text-xs text-gray-400">{moment(data?.createdAt).format('h:mm A')}</div>
        </div>

        {data?.attachments?.length > 0 ? (
          data.attachments.map((attachment) => (
            <div key={attachment._id}>
              {renderAttachment(attachment)}
            </div>
          ))
        ) : (
          <div className={message}>{data?.content}</div>
        )}

      </div>
    </div>
  );
};

export default MessageBox;
