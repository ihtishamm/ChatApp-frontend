import MessageInput from "./MessageInput";
import { IoMdSend } from "react-icons/io";
import { ChangeEvent, FormEvent, useState } from "react";
import { FileDropdownMenu } from "@/components/Custom/FilesDropDownMenu";

interface SendMessageProps {
  message: string;
  setMessage: (message: string) => void;
  submitHandler: (e: FormEvent) => void;
}


const SendMessage:React.FC<SendMessageProps> = ({message,setMessage,submitHandler}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };
    return (
          <div 
          className="
           py-4 px-4 border-t  flex items-center gap-2 lg:gap-4 w-full
          ">
             <FileDropdownMenu handleFileChange={handleFileChange}/>
           <form className="flex items-center gap-2 lg:gap-4 w-full" onSubmit={submitHandler}> 
             <MessageInput value={message} onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}/>
             <button
             type="submit" className="
              rounded-full
              p-3 bg-sky-500  cursor-pointer hover:bg-sky-600 transition
             ">
               <IoMdSend size={28} className="text-white"/>
             </button>
           </form>
          </div>
    )
}
export default SendMessage