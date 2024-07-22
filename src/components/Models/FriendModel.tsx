import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaUserPlus } from "react-icons/fa";
import avatar from "@/assets/avatar.jpg";
import { IoPersonAddSharp } from "react-icons/io5";

const members = [
  { id: 1, name: "John Doe", avatar: avatar },
  { id: 2, name: "Jane Smith", avatar: avatar },
  { id: 3, name: "Robert Brown", avatar: avatar },
  { id: 4, name: "Emily Davis", avatar: avatar },
  { id: 5, name: "Michael Johnson", avatar: avatar },
  { id: 6, name: "Linda Wilson", avatar: avatar },
  { id: 7, name: "David Martinez", avatar: avatar },
  { id: 8, name: "Sarah Lee", avatar: avatar },
  { id: 9, name: "Paul Garcia", avatar: avatar },
  { id: 10, name: "Laura Rodriguez", avatar: avatar },
];

export function FriendRequestDialog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sentRequests, setSentRequests] = useState<number[]>([]);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendRequest = (id: number) => {
    setSentRequests(prev => [...prev, id]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="rounded-full p-2 bg-gray-200 text-gray-600 cursor-pointer hover:opacity-75 transition"
        >
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
          onChange={e => setSearchTerm(e.target.value)}
          className="mb-4 mt-4"
        />
        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
          {filteredMembers.length === 0 ? (
            <div className="text-gray-500 text-center">No users found</div>
          ) : (
            filteredMembers.map(member => (
              <div key={member.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100">
                <div className="flex items-center gap-2">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-gray-700">{member.name}</span>
                </div>
                <Button
                  variant="outline"
                  
                  size="sm"
                  onClick={() => handleSendRequest(member.id)}
                  disabled={sentRequests.includes(member.id)}
                  className="bg-green"
                >
                  {sentRequests.includes(member.id) ? "Sent" : "Send Request"}
                </Button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
