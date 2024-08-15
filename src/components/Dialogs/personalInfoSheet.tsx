
import avatar from "@/assets/avatar.jpg"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { FaEdit } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/useUserApi";


export function  PersonalSheet() {
   const { data } = useCurrentUser();
  return (
    <Sheet>
      <SheetTrigger asChild>
      <Avatar className="h-[4rem] w-[4rem] object-contain cursor-pointer">
            <AvatarImage src={ data?.avatar || avatar } />
          </Avatar>
      </SheetTrigger>
      <SheetContent className="md:w-[400px]" side="left">
        <SheetHeader>
          <SheetTitle>Personal Info</SheetTitle>
        </SheetHeader>

            <div className="flex flex-col items-center gap-4 py-4">
            <img
              src={data?.avatar || avatar}
              alt={`${"my"}'s profile`}
              className="w-48 h-48 rounded-full"
            />
            <div className="text-center">
              <h2 className="text-xl font-bold">{data?.fullName}</h2>
                <p className="text-gray-600">{data?.email}</p>
            </div>
          </div>
          <hr className="border-t border-gray-200 my-4 w-full" />
          <div className="px-4 py-2">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-gray-600 mt-2">{data?.about}</p>
          </div>
          <div className="px-4 py-2 w-full">
         <Button variant="outline" size="sm" className="flex items-center gap-2 w-full">
                <FaEdit className="mr-2" size={18} />
                Edit  Info
              </Button>
          </div>
          </SheetContent>
    </Sheet>
  )
}
