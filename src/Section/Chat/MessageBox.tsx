import { Avatar, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import moment from "moment";
import { useAuth } from "@/context/AuthProvider";
import { FaFileAlt } from "react-icons/fa";
import { ImageChange, fileFormat } from "@/lib/helper";

const MessageBox = ({ data }) => {
  console.log("data", data);
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

  const renderAttachment = (attachment) => {
    const { url, filename } = attachment;
    const extension = filename.split('.').pop().toLowerCase();

    if (['png', 'jpg', 'jpeg', 'gif'].includes(extension)) {
      return <img src={url} alt={filename} className="max-w-xs max-h-60 rounded-lg" />;
    } else if (['mp4', 'webm', 'ogg'].includes(extension)) {
      return (
        <video controls className="max-w-xs max-h-60 rounded-lg">
          <source src={url} type={`video/${extension}`} />
          Your browser does not support the video tag.
        </video>
      );
    } else if (['mp3', 'wav'].includes(extension)) {
      return <audio controls src={url} className="w-full" />;
    } else {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
          <FaFileAlt size={24} />
          {filename}
        </a>
      );
    }
  };

  const RenderAttachment = (file, url) => {
    switch (file) {
      case "video":
        return <video src={url} preload="none" className="max-w-xs max-h-60 rounded-lg" controls />;

      case "image":
        return (
          <img
            src={url}
            alt="Attachment"
            className="max-w-xs max-h-60 rounded-lg"
          />
        );

      case "audio":
        return <audio src={url} preload="none" controls className="w-full" />;

      default:
        return <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
        <FaFileAlt size={24} />
        {file}
      </a>;
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
          data.attachments.map((attachment) => {
            const url = attachment.url;
            const file = fileFormat(url);
            return (
              <div key={attachment._id}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {RenderAttachment(file, url)}
                </a>
              </div>
            );
          })
        ) : (
          <div className={message}>{data?.content}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
