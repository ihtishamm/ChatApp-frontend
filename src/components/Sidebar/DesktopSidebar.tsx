import useRoutes from "@/hooks/useRoutes";
import DesktopSidebarItem from "./DesktopItems";
import { useAuth } from "@/context/AuthProvider";
const DesktopSidebar = () => {
    const route = useRoutes();
    const { logOut } = useAuth();

    return (
        <div className="hidden
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
                          active={item.active} 
                          badge={item.badge}
                         />
                    ))}
                </ul>
                  <button className="pt-10" onClick={() => logOut()}>logout</button>
          </nav>


        </div>
    );
    }
    export default DesktopSidebar;