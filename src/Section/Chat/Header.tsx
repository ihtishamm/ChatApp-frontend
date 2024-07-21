import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HiChevronLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import avatar from "@/assets/avatar.jpg"
import { HiEllipsisHorizontal } from "react-icons/hi2";
 
const Header = () => {
    const user = "online";
    const statusText = user === "online" ? "online" : "offline"
    return(
        <div className="
        bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm
        ">
            <div className="flex gap-3 items-center">
             <Link to="/" className="
              lg:hidden block text-sky-500 
               hover-text-sky-600 transition
               cursor-pointer
             "
             >
            <HiChevronLeft size={32}/>
             </Link>
              <Avatar className="w-[4rem] h-[4rem]">
                <AvatarImage src={avatar}/>
              </Avatar>
              <div className="flex flex-col"> 
                    <div>
                        <h1>Harme West</h1>
                    </div>
                    <div className="text-sm font-light 
               text-neutral-500">
                {statusText}
               </div>
              </div>
            </div>
         <HiEllipsisHorizontal size={32}
          onClick={() => {}}
        className="cursor-pointer text-sky-500 hover:text-sky-600 transition"
         />
        </div>
    )
}

export default Header