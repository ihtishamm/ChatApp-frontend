import DesktopSidebar from "./DesktopSidebar";


 const Sidebar = ({ children }: { children: React.ReactNode }) =>{

    return (
        <div className="h-full h-screen">
            <DesktopSidebar/>
            <main className="lg:pl-20 h-screen">
            {children}
            </main>
        </div>
    )
 }

 export default Sidebar;