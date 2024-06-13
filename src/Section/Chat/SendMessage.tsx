import  { IoIosAttach } from "react-icons/io";
import MessageInput from "./MessageInput";
import { IoMdSend } from "react-icons/io";
const SendMessage = () => {
    return (
          <div 
          className="
           py-4 px-4 border-t  flex items-center gap-2 lg:gap-4 w-full
          "><IoIosAttach size={38} className="text-neutral-500"/>
           <form className="flex items-center gap-2 lg:gap-4 w-full"> 
             <MessageInput/>
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