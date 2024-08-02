import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { useLeaveGroup } from "@/hooks/useChat";
import { useQueryClient } from "@tanstack/react-query";
import { IoExitSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
  


  
  export function LeaveGroupAlertDialog({chatId}: {chatId: string}) {
    const queryClient = useQueryClient();
    const {mutate:leaveGroup, isPending} =useLeaveGroup();
    const navigate = useNavigate();

    const handleLeaveGroup = () => {
      leaveGroup(chatId, {
        onSuccess: () => {
          toast.success("You have left the group successfully");
           queryClient.invalidateQueries({ queryKey: ['myChats', chatId] });
          navigate("/");
        },
        onError: () => {
          toast.error("Failed to leave the group");
        },
      });
    };
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
                <IoExitSharp className="mr-2"  size={24}/>
                Exit Group
               </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Do you really want to exit this group?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLeaveGroup} disabled={isPending}>Exit Group</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  