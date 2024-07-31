import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRef, ChangeEvent } from "react";
import { IoIosAttach } from "react-icons/io";

interface FileDropdownMenuProps {
  onFileSelect: (files: FileList) => void;
}

export function FileDropdownMenu({ onFileSelect }: FileDropdownMenuProps) {
  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const selectImage = () => imageRef.current?.click();
  const selectVideo = () => videoRef.current?.click();
  const selectFile = () => fileRef.current?.click();

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileSelect(e.target.files);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hover:cursor-pointer">
          <IoIosAttach size={38} className="text-neutral-500" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuCheckboxItem onClick={selectImage}>
          <label>
            Images
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={fileChangeHandler}
              ref={imageRef}
              style={{ display: 'none' }} // Hide the input
            />
          </label>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem onClick={selectVideo}>
          <label>
            Videos
            <input
              type="file"
              multiple
              accept="video/*"
              onChange={fileChangeHandler}
              ref={videoRef}
              style={{ display: 'none' }} // Hide the input
            />
          </label>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem onClick={selectFile}>
          <label>
            Files
            <input
              type="file"
              multiple
              accept="*"
              onChange={fileChangeHandler}
              ref={fileRef}
              style={{ display: 'none' }} // Hide the input
            />
          </label>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
