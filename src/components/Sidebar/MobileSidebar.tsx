import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./MobileItems";
const MobileSidebar = () => {
    const route = useRoutes();
    const { isOpen } = useConversation();
    if(isOpen) return null;

    return (
         <div className="
          fixed  justify-between w-full 
           bottom-0 z-40 bg-white flex  items-center border-t-[1px] lg:hidden
         ">
             {route.map((item) =>(
                <MobileItem key={item.href}
                href={item.href}
                icon={item.icon}
                active={item.active}
               />
             ))}

            </div>
    )
}

export default MobileSidebar;