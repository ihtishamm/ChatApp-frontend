import MessageInput from "./MessageInput";
import { IoMdSend, IoIosAttach, IoMdCloseCircle } from "react-icons/io";
import { ChangeEvent, FormEvent, useState, useRef } from "react";
import { useSendAttachment } from "@/hooks/useMessages";
import { toast } from "react-toastify";

interface SendMessageProps {
  message: string;
  setMessage: (message: string) => void;
  submitHandler: (e: FormEvent) => void;
  chatId: string;
}

const SendMessage: React.FC<SendMessageProps> = ({ message, setMessage, submitHandler, chatId }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { mutate } = useSendAttachment();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleSendFiles = () => {
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append("files", file);
      });
      formData.append("chatId", chatId);

      const toastId = toast.loading("Uploading files...");

      mutate(formData, {
        onSuccess: () => {
          toast.update(toastId, {
            render: "Files uploaded successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          setSelectedFiles([]);
        },
        onError: (error: any) => {
          toast.update(toastId, {
            render: "Error uploading files",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        },
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendFiles();
    submitHandler(e);
    setSelectedFiles([]);
  };

  return (
    <div className="py-4 px-4 border-t flex items-center gap-2 lg:gap-4 w-full">
      <input
        type="file"
        multiple
        onChange={handleFileSelect}
        ref={fileInputRef}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="rounded-full p-3 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
      >
        <IoIosAttach size={28} className="text-white" />
      </button>
      {selectedFiles.length > 0 ? (
        <div className="flex items-center gap-2 lg:gap-4 w-full">
          <div className=" relative w-full flex  flex-col  lg:flex-row gap-1">
            {Array.from(selectedFiles).map((file, index) => (
              <div key={index} className="flex items-center text-sm">
              {file.name}
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="ml-1 text-red-500"
              >
                <IoMdCloseCircle size={16} />
              </button>
            </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleSendFiles}
            className="rounded-full p-3 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
          >
            <IoMdSend size={28} className="text-white" />
          </button>
        </div>
      ) : (
        <form className="flex items-center gap-2 lg:gap-4 w-full" onSubmit={submitHandler}>
          <MessageInput value={message} onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} />
          <button
            type="submit"
            className="rounded-full p-3 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
          >
            <IoMdSend size={28} className="text-white" />
          </button>
        </form>
      )}
    </div>
  );
};

export default SendMessage;
