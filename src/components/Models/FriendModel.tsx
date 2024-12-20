import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IoPersonAddSharp } from "react-icons/io5";
import { useSearchUsers } from "@/hooks/useUserApi";
import { useDebounce } from "@/hooks/useDebounce";
import { Spinner } from "../Custom/spinner";
import { useSendRequest } from "@/hooks/useRequest";
import { toast } from "react-toastify";



export function FriendRequestDialog() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const { data: members, isLoading } = useSearchUsers(debouncedSearchTerm);
  const { mutate, isError} = useSendRequest();
  console.log("error", isError);

  const handleSendRequest = (reqId: string) => {
    mutate(reqId, {
      onSuccess: () => {
        toast.success("Request Sent Successfully");
      },
       onError: (error) => {
        toast.error(`${error?.message}`);
       }
    });
  };

 

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full p-2 bg-gray-200 text-gray-600 cursor-pointer hover:opacity-75 transition">
          <IoPersonAddSharp size={20} />
        </div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md p-4">
        <DialogHeader>
          <DialogTitle>Send Friend Request</DialogTitle>
        </DialogHeader>
        <Input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 mt-4"
        />
        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
          {isLoading && (
              <Spinner />
            
          )}
          {members?.length === 0 ? (
            <div className="text-gray-500 text-center">No users found</div>
          ) : (
            members?.map((member) => (
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendRequest(member?._id)}
                  className="bg-green"
                >
                  Send Request
                </Button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
