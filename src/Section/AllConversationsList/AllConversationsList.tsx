import clsx from "clsx"
import { useState } from "react"
import { MdAdd, MdOutlineGroupAdd } from "react-icons/md"
const ConversationsList = () => {
    const [isOpen] = useState(false)
    return (
        <aside className={
            clsx(`fixed insert-y-0 pb-20 lg:pb:0 lg:left-20 lg:w-80 lg:block overflow-y-auto
                 border-r border-gray-200 
            `, isOpen ? "hidden" : "block w-full left-0")
        }>
         <div className="px-5">
           <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-nautral-800">
                 Messages
            </div>
            
                <div className="rounded-full p-2 bg-gray-200 text-gray-600 cursor-pointer hover:opacity-75
                    transition
                "> 
                  <MdAdd size={20}/>
                </div>
                <div className="rounded-full p-2 bg-gray-200 text-gray-600 cursor-pointer hover:opacity-75
                    transition">
                <MdOutlineGroupAdd size={20}/>
                </div>
           </div>
         </div>
        </aside>
    )
}

export default ConversationsList