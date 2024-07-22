import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { FaEdit, FaUserPlus } from "react-icons/fa";
import avatar from "@/assets/avatar.jpg";
import { IoIosArrowDown } from "react-icons/io";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LeaveGroupAlertDialog } from "./LeaveGroupAlert";
import { ChatAlertDialog } from "./DeleteChatAlertDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const members = [
  { id: 1, name: "John Doe", avatar: avatar, status: "Tears flow from the eyes, and the heart breaks into pieces",isAdmin:true },
  { id: 2, name: "Jane Smith", avatar: avatar, status: "First of all, everyone should be kind and caring",isAdmin:true },
  { id: 3, name: "Robert Brown", avatar: avatar, status: "Programming is my passion, and I love it" ,isAdmin:false},
  { id: 4, name: "Emily Davis", avatar: avatar, status: "Learning never stops, and growth is continuous",isAdmin:false },
  { id: 5, name: "Michael Johnson", avatar: avatar, status: "In the end, it's all about the journey" ,isAdmin:false},
  { id: 6, name: "Linda Wilson", avatar: avatar, status: "Be the change you wish to see in the world",isAdmin:false },
  { id: 7, name: "David Martinez", avatar: avatar, status: "Success is a journey, not a destination",isAdmin:false },
  { id: 8, name: "Sarah Lee", avatar: avatar, status: "Happiness is a state of mind, not a destination",isAdmin:false },
  { id: 9, name: "Paul Garcia", avatar: avatar, status: "Believe in yourself and all that you are" ,isAdmin:false},
  { id: 10, name: "Laura Rodriguez", avatar: avatar, status: "Kindness is the language which the deaf can hear",isAdmin:false },
];

const truncateStatus = (status: string, maxWords: number) => {
  const words = status.split(' ');
  if (words.length <= maxWords) return status;
  return words.slice(0, maxWords).join(' ') + '...';
};

export function GroupSheet({ isAdmin }: { isAdmin: boolean }) {
  const [showAllMembers, setShowAllMembers] = useState(false);

  const visibleMembers = showAllMembers ? members : members.slice(0, 5);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <HiEllipsisHorizontal
          size={32}
          className="cursor-pointer text-sky-500 hover:text-sky-600 transition"
        />
      </SheetTrigger>
      <SheetContent className="md:w-[400px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Group Info</SheetTitle>
        </SheetHeader>
        <div>
          <div className="flex flex-col items-center gap-4 py-4">
            <img
              src={avatar}
              alt={`Group icon`}
              className="w-48 h-48 rounded-full"
            />
            <div className="text-center">
              <h2 className="text-xl font-bold">Cricket Group</h2>
              <p className="text-gray-500">Group · 54 members</p>
            </div>
          </div>
          <hr className="border-t border-gray-200 my-4 w-full" />
          <div className="px-4 py-2">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-gray-700 mt-2">Here all the dudes are programmers</p>
            <p className="text-gray-500 mt-3">Created by Ihtisham Hassan</p>
          </div>
          <hr className="border-t border-gray-200 my-4 w-full" />

          <div className="px-4 py-2">
            <h3 className="text-lg font-semibold">Members</h3>
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <FaUserPlus size={18} />
                Add member
              </Button>
              {visibleMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between hover:bg-gray-100 p-2 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <span className="text-gray-700">{member.name}</span>
                      <p className="text-gray-500 text-sm">{truncateStatus(member.status, 2)}</p>
                    </div>
                  </div>
                  {
                    member.isAdmin && <span className="text-xs text-green-600 "> Group Admin</span>
                  }
                  {isAdmin && !member.isAdmin && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-2">
                          <IoIosArrowDown />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Make group admin</DropdownMenuItem>
                        <DropdownMenuItem>Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              ))}
              {!showAllMembers && members.length > 5 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => setShowAllMembers(true)}
                >
                  View All
                </Button>
              )}
              {showAllMembers && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => setShowAllMembers(false)}
                >
                  Show Less
                </Button>
              )}
            </div>
          </div>

          <hr className="border-t border-gray-200 my-4 w-full" />

          <div className="flex gap-2 mt-2 flex-col">
            {isAdmin && (
              <Button variant="outline" size="sm">
                <FaEdit className="mr-2" size={18} />
                Edit Group Info
              </Button>
            )}

            <ChatAlertDialog />
            <LeaveGroupAlertDialog />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
