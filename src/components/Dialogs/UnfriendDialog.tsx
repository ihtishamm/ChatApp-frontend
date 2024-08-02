import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { useDeleteChat} from "@/hooks/useChat";
import { FaUserMinus } from "react-icons/fa";
  import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
  
  export function UnfriendAlertDialog({chatId}: {chatId: string}) {
        const {mutate:deleteChat} =useDeleteChat();
        const navigate = useNavigate(); 
        const handleDeleteChat = () => {
          deleteChat(chatId, {
            onSuccess: () => {
              toast.success("You have deleted the chat successfully");
               navigate("/");
            },
            onError: () => {
              toast.error("Failed to delete the chat");
            },
          });
        };
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button
            variant="destructive" 
            className="flex items-center gap-2 w-full"
          >
            <FaUserMinus size={20} />
             Unfriend
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to unfriend this user?</AlertDialogTitle>
          </AlertDialogHeader>
           <AlertDialogDescription>
           This action will remove this user from your friends list and you will no longer be able to message each other.
           </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteChat}>Unfriend</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  