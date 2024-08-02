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
import { useDeleteChat} from "@/hooks/useChat";
  import { HiTrash } from "react-icons/hi";
  import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
  
  export function ChatAlertDialog({chatId}: {chatId: string}) {
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
            <HiTrash size={20} />
            Delete Chat
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle> Do you want to delete chat?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteChat}>Delete Chat</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  