import { FC, ReactNode } from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

interface SidebarProps {
  children: ReactNode;
  setActiveComponent: (component: string) => void;
    activeComponent: string;
    requestCount: number;
}

const Sidebar: FC<SidebarProps> = ({ children, setActiveComponent ,activeComponent,requestCount}) => {
  return (
    <div className="h-full h-screen">
      <DesktopSidebar setActiveComponent={setActiveComponent} activeComponent={activeComponent} requestCount={requestCount} />
      <MobileSidebar setActiveComponent={setActiveComponent} activeComponent={activeComponent} requestCount={requestCount} />
      <main className="lg:pl-20 h-screen">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
