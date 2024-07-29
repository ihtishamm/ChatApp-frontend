import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { IoIosAttach } from "react-icons/io"
  import { ChangeEvent } from "react";
  
  interface FileDropdownMenuProps {
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }
  
  export function FileDropdownMenu({ handleFileChange }: FileDropdownMenuProps) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="hover:cursor-pointer">
            <IoIosAttach size={38} className="text-neutral-500" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuCheckboxItem>
            <label>
              Images
              <input type="file" accept="image/*" onChange={handleFileChange} hidden />
            </label>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>
            <label>
              Videos
              <input type="file" accept="video/*" onChange={handleFileChange} hidden />
            </label>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>
            <label>
              Files
              <input type="file" accept="*" onChange={handleFileChange} hidden />
            </label>
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  