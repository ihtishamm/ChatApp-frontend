import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { FaEdit } from "react-icons/fa";
import avatar from "@/assets/avatar.jpg";
import { IoIosArrowDown } from "react-icons/io";
import { useQueryClient } from "@tanstack/react-query";
import {truncateStatus} from "@/lib/helper"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LeaveGroupAlertDialog } from "./LeaveGroupAlert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Chat} from "@/Types/Chat";
import { Friend } from "@/Types/User";
import { getFirstThreeMemberAvatars} from "@/lib/helper";
import { NewMemberDialog } from "../Models/addMemberModel";
import { useRemoveMembers } from "@/hooks/useChat";
import { toast } from "react-toastify";

type GroupSheetProps = {
  isAdmin: boolean;
  groupDetails: Chat;
};

export function GroupSheet({ isAdmin, groupDetails }: GroupSheetProps) {
  const [showAllMembers, setShowAllMembers] = useState(false);
  const {mutate: removeMember} = useRemoveMembers();
 const queryClient = useQueryClient();
  const members: Friend[] = groupDetails?.members || [];
  const creator = members.find(member => member._id === groupDetails.creator);
  const creatorName = creator ? creator.fullName : "Unknown";

  const sortedMembers = [...members].sort((a, b) => {
    if (a._id === groupDetails.creator) return -1;
    if (b._id === groupDetails.creator) return 1;
    return 0;
  });

  const visibleMembers = showAllMembers ? sortedMembers : sortedMembers.slice(0, 3);

  const firstThreeAvatars = getFirstThreeMemberAvatars(members);

  const handleRemoveMember = (memberId: string) => {
    const body = {
      chatId: groupDetails._id,
      userId: memberId,
    };

    removeMember(body, {
      onSuccess: () => {
        toast.success("Member removed successfully");
        queryClient.invalidateQueries({ queryKey: ["singleGroupDetails", groupDetails._id] });
      },
      onError: () => {
        toast.error("Failed to remove member");
      },
    });
  };


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
            {firstThreeAvatars.length === 3 ? (
              <div className="relative w-24 h-24">
                <img
                  src={firstThreeAvatars[0]}
                  alt="Member 1"
                  className="absolute w-24 h-24 rounded-full top-0 left-1/2 transform -translate-x-1/2"
                />
                <img
                  src={firstThreeAvatars[1]}
                  alt="Member 2"
                  className="absolute w-24 h-24 rounded-full bottom-0 left-0 transform translate-x-1/4"
                />
                <img
                  src={firstThreeAvatars[2]}
                  alt="Member 3"
                  className="absolute w-24 h-24 rounded-full bottom-0 right-0 transform -translate-x-1/4"
                />
              </div>
            ) : (
              <img
                src={avatar}
                alt="Group icon"
                className="w-48 h-48 rounded-full"
              />
            )}
            <div className="text-center">
              <h2 className="text-xl font-bold">{groupDetails?.name}</h2>
              <p className="text-gray-500">
                Group · {members.length} members
              </p>
            </div>
          </div>
          <hr className="border-t border-gray-200 my-4 w-full" />
          <div className="px-4 py-2">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-gray-700 mt-2">{`Welcome to ${groupDetails?.name}.Feel free to jump in, share your thoughts, and enjoy the conversation!`}</p>
            <p className="text-gray-500 mt-3">Created by {creatorName}</p>
          </div>
          <hr className="border-t border-gray-200 my-4 w-full" />

          <div className="px-4 py-2">
            <h3 className="text-lg font-semibold">Members</h3>
            <div className="flex flex-col gap-2 mt-2">
               <NewMemberDialog  chatId={groupDetails?._id} existingMembers={groupDetails}/>
              {visibleMembers.map((member) => {
                const isMemberAdmin = member._id === groupDetails.creator;
                return (
                  <div
                    key={member?._id}
                    className="flex items-center justify-between hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={member?.avatar || avatar}
                        alt={member?.fullName || "Member"}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <span className="text-gray-700">{member?.fullName}</span>
                        <p className="text-gray-500 text-sm">{truncateStatus( member?.about,4)}</p>
                      </div>
                    </div>
                    {isMemberAdmin && (
                      <span className="text-xs text-green-600">Group Admin</span>
                    )}
                    {isAdmin && !isMemberAdmin && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="p-2">
                            <IoIosArrowDown />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleRemoveMember(member._id)}>Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                );
              })}
              {!showAllMembers && members.length > 3 && (
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
            {/* {isAdmin && (
              <Button variant="outline" size="sm">
                <FaEdit className="mr-2" size={18} />
                Edit Group Info
              </Button>
            )} */}
            <LeaveGroupAlertDialog chatId={groupDetails?._id} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
