import useRoutes from "@/hooks/useRoutes";
import { useState } from "react";

const DesktopSidebar = () => {
    const route = useRoutes();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="Hidden
         lg:fixed lg:insert-y-0 lg:left-0 lg:z:40 lg:w-20
         xl:px-6 lg:overflow-y-auto lg-bg-white
         lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col lg:justify-between lg:h-screen
         ">
          <nav className="mt-4 flex flex-col
             justify-bwtween">

          </nav>

        </div>
    );
    }
    export default DesktopSidebar;