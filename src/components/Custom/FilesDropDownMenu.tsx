
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoIosAttach } from "react-icons/io"
import { Button } from "../ui/button"

export function FileDropdownMenu() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <div className="hover:cursor-pointer">
      <IoIosAttach size={38} className="text-neutral-500"/>
      </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuCheckboxItem
        >
          Images
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
        >
          Videos
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
        >
          Files
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
