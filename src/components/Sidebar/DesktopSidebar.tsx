import useRoutes from "@/hooks/useRoutes";
import DesktopSidebarItem from "./DesktopItems";
import { useAuth } from "@/context/AuthProvider";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { useState } from "react";
import { DrawerDialogDemo } from "../Dialogs/ProfileDialog";
interface DesktopSidebarProps {
    activeComponent: string;
    setActiveComponent: (component: string) => void;
  }

const DesktopSidebar:React.FC<DesktopSidebarProps> = ({ activeComponent, setActiveComponent}) => {

    const route = useRoutes(activeComponent);
    const { logOut, user } = useAuth();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
   

    return (
        <div className="hidden
         lg:fixed lg:insert-y-0 lg:left-0 lg:z:40 lg:w-20
         xl:px-6 lg:overflow-y-auto lg-bg-white
         lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col lg:justify-between lg:h-screen
         ">
          <nav className="mt-4 flex flex-col
             justify-bwtween flex-grow">
                <ul role="list" className="flex flex-col items-center space-y-1">
                    {route.map((item) => (
                         <DesktopSidebarItem key={item.label}
                          label={item.label} icon={item.icon}
                          active={item.active} 
                          badge={item.badge}
                          onClick={() => setActiveComponent(item.label.toLowerCase())}
                         />
                    ))}
                </ul>

                    <div className="flex flex-col items-center mt-auto space-y-4">
           <div className="pt-10" onClick={() => logOut()}>
               <HiArrowLeftOnRectangle className="text-gray-500 cursor-pointer h-10 w-10"/>
                  </div>
                   <div className="flex items-center justify-center">
                   <DrawerDialogDemo open={isDialogOpen} setOpen={setIsDialogOpen} user={user} />
                   </div>
                   </div>

          </nav>

         
        </div>
    );
    }
    export default DesktopSidebar;