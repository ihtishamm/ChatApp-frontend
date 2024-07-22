
import avatar from "@/assets/avatar.jpg"
import { HiEllipsisHorizontal } from "react-icons/hi2";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ChatAlertDialog } from "./DeleteChatAlertDialog";


export function PersonSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
      <HiEllipsisHorizontal size={32}
        className="cursor-pointer text-sky-500 hover:text-sky-600 transition"
         />
      </SheetTrigger>
      <SheetContent className="md:w-[400px]">
        <SheetHeader>
          <SheetTitle>Contact Info</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <img
            src={avatar}
            alt={`${"my"}'s profile`}
            className="w-48 h-48 rounded-full"
          />
          <div className="text-center">
            <h2 className="text-xl font-bold">Shami</h2>
            <p className="text-gray-500">shami@gmail.com</p>
          </div>
        </div>
        <hr className="border-t border-gray-200 my-4 w-full" />
        <div className="px-4 py-2">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="text-gray-600 mt-2">This is all about my life</p>
        </div>
        <hr className="border-t border-gray-200 my-4 w-full" />
        <div className="px-4 py-2">
           <ChatAlertDialog/>
        </div>
      </SheetContent>
    </Sheet>
  )
}
