import useRoutes from "@/hooks/useRoutes";
import { useState } from "react";
import DesktopSidebarItem from "./DesktopItems";

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
                <ul role="list" className="flex flex-col items-center space-y-1">
                    {route.map((item) => (
                         <DesktopSidebarItem key={item.label}
                          href={item.href}
                          label={item.label} icon={item.icon}
                          active={item.active} onClick={item.onClick}
                         />
                    ))}
                </ul>
          </nav>


        </div>
    );
    }
    export default DesktopSidebar;