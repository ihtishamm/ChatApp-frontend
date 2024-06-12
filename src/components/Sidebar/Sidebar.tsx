import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";


 const Sidebar = ({ children }: { children: React.ReactNode }) =>{

    return (
        <div className="h-full h-screen">
            <DesktopSidebar/>
            <MobileSidebar/>
            <main className="lg:pl-20 h-screen">
            {children}
            </main>
        </div>
    )
 }

 export default Sidebar;