import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { FaUserPlus } from "react-icons/fa";
import { useMyFriends } from "@/hooks/useUserApi";
import { useAddMembers } from "@/hooks/useChat";
import { Friend } from "@/Types/User";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Checkbox } from "../ui/checkbox";
import { Spinner } from "../Custom/spinner";
import { useQueryClient } from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function NewMemberDialog({ chatId, existingMembers }: { chatId: string; existingMembers: any }) {
  const { data: friends, isLoading } = useMyFriends();
  const queryClient = useQueryClient();
  const { mutate: addMember } = useAddMembers();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>([]);

  useEffect(() => {
    if (friends && existingMembers) {
      const groupFriendIds = existingMembers.members.map((member: { _id: string; }) => member._id);
      console.log(groupFriendIds);
      const newFilteredFriends = friends?.filter(friend => !groupFriendIds.includes(friend._id));
      setFilteredFriends(newFilteredFriends);
    }
  }, [friends, existingMembers]);

  const handleMemberToggle = (memberId: string) => {
    setSelectedMembers(prevState =>
      prevState.includes(memberId)
        ? prevState.filter(id => id !== memberId)
        : [...prevState, memberId]
    );
  };

  const handleAddMembers = () => {
    const body = {
      chatId,
      members: selectedMembers,
    };
    addMember(body, {
      onSuccess: () => {
        toast.success("Members added successfully");
        queryClient.invalidateQueries({ queryKey: ['singleGroupDetails', chatId] });
       setIsOpen(false);
        setSelectedMembers([]);
      },
      onError: () => {
        toast.error("Failed to add members");
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <FaUserPlus size={18} />
          Add member
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md p-4">
        <DialogHeader>
          <DialogTitle>Add new members</DialogTitle>
          <DialogDescription className="sr-only">Model to add new members in the group</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
          {isLoading ? (
            <Spinner />
          ) : filteredFriends.length === 0 ? (
            <div className="text-gray-500 text-center">No users found</div>
          ) : (
            filteredFriends.map((member) => (
              <div
                key={member._id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={member.avatar}
                    alt={member.fullName}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-gray-700">{member.fullName}</span>
                </div>
                <Checkbox
                  id={member._id}
                  checked={selectedMembers.includes(member._id)}
                  onCheckedChange={() => handleMemberToggle(member._id)}
                />
              </div>
            ))
          )}
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline" type="button">Cancel</Button>
          </DialogClose>
          <Button variant="default" className="color-red" onClick={handleAddMembers}>
            Add Members
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NewMemberDialog;
