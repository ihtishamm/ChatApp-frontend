import { FC, ReactNode } from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

interface SidebarProps {
  children: ReactNode;
  setActiveComponent: (component: string) => void;
    activeComponent: string;
}

const Sidebar: FC<SidebarProps> = ({ children, setActiveComponent ,activeComponent}) => {
  return (
    <div className="h-full h-screen">
      <DesktopSidebar setActiveComponent={setActiveComponent} activeComponent={activeComponent}  />
      <MobileSidebar setActiveComponent={setActiveComponent} activeComponent={activeComponent} />
      <main className="lg:pl-20 h-screen">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
