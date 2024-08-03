import useRoutes from "@/hooks/useRoutes";
import DesktopSidebarItem from "./DesktopItems";
import { useAuth } from "@/context/AuthProvider";
import { LogoutAlertDialog } from "../Dialogs/LogoutAlert";
import { PersonalSheet } from "../Dialogs/personalInfoSheet";
import { useEvents } from "@/context/EventsContext";
interface DesktopSidebarProps {
    activeComponent: string;
    setActiveComponent: (component: string) => void;
  }

const DesktopSidebar:React.FC<DesktopSidebarProps> = ({ activeComponent, setActiveComponent}) => {

    const {requestCount} = useEvents();
    const route = useRoutes(activeComponent,requestCount);
    const { logOut } = useAuth();

    
   

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
                          badge={item?.badge}
                          onClick={() => setActiveComponent(item.label.toLowerCase())}
                          // onBadgeClick={item.label === "Notifications" ? setCount : undefined}
                         />
                    ))}
                </ul>

                    <div className="flex flex-col items-center mt-auto space-y-4">
                      <LogoutAlertDialog action={logOut}/>
                   <div className="flex items-center justify-center">
                     <PersonalSheet/>
                   </div>
                   </div>

          </nav>

         
        </div>
    );
    }
    export default DesktopSidebar;