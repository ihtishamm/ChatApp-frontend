import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { MdOutlineGroupAdd } from "react-icons/md";
import AnimatedMultiSelect from "../Custom/AnimatedSelect";
import { useMyFriends } from "@/hooks/useUserApi";
import { useCreateGroup } from "@/hooks/useChat";
import { toast } from "react-toastify";
import { MultiValue } from 'react-select';

interface Friend {
  _id: string;
  fullName: string;
  avatar?: string;
}

export function NewGroupDialog() {
  const { data: friends} = useMyFriends();
  const { mutate: createGroup } = useCreateGroup();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [groupName, setGroupName] = useState("");

  const handleMembersChange = (selectedOptions: MultiValue<{ value: string; label: string; avatar?: string }>) => {
    setSelectedMembers(selectedOptions ? selectedOptions.map((option) => option.value) : []);
  };

  const handleCreateGroup = () => {
    if (selectedMembers.length < 2) {
      toast.error("Please select at least two members to create a group.");
      return;
    }
    if (!groupName) {
      toast.error("Please enter a group name.");
      return;
    }
    const groupData = {
      name: groupName,
      members: selectedMembers,
    };

    createGroup(groupData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['myChats'] });
        toast.success("Group created successfully");
        setGroupName("");
        setSelectedMembers([]);
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const friendOptions = friends?.map((friend: Friend) => ({
    value: friend._id,
    label: friend.fullName,
    avatar: friend.avatar,
  })) || [];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="rounded-full p-2 bg-gray-200 text-gray-600 cursor-pointer hover:opacity-75 transition">
          <MdOutlineGroupAdd size={20} />
        </div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md p-4">
        <DialogHeader>
          <DialogTitle>Create new group</DialogTitle>
          <DialogDescription className="sr-only">Model to create new group</DialogDescription>
        </DialogHeader>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-4">
            <div className="mt-10 flex flex-col gap-y-8">
              <div>
                <label htmlFor="group-name" className="block text-lg font-medium leading-6 text-gray-900 mb-2">
                  Group Name
                </label>
                <Input
                  id="group-name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <div>
                <h2 className="block text-lg font-medium leading-6 text-gray-900 mb-2">
                  Add Members
                </h2>
                <AnimatedMultiSelect
                  options={friendOptions}
                  onChange={handleMembersChange}
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline" type="button" className="w-full mt-2 md:mt-0">Cancel</Button>
          </DialogClose>
          <Button variant="default" className="color-red" onClick={handleCreateGroup}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
