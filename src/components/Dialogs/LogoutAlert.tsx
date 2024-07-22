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
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
  


  
  export function LogoutAlertDialog({action}:{action:() => void}) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
        <div className="pt-10">
               <HiArrowLeftOnRectangle className="text-gray-500 cursor-pointer h-10 w-10"/>
                  </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle> Do you want to logout?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={action}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  