import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./MobileItems";
interface MobileSidebarProps {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
  requestCount: number;
}
const MobileSidebar:React.FC<MobileSidebarProps> = ({activeComponent, setActiveComponent, requestCount}) => {
    const route = useRoutes(activeComponent,requestCount);
    const { isOpen } = useConversation();
    if(isOpen) return null;

    return (
         <div className="
          fixed  justify-between w-full 
           bottom-0 z-40 bg-white flex  items-center border-t-[1px] lg:hidden
         ">
             {route.map((item) =>(
                <MobileItem key={item.label}
                label={item.label}
                icon={item.icon}
                badge={item?.badge}
                onClick={() => setActiveComponent(item.label.toLowerCase())}
                active={item.active}
               />
             ))}

            </div>
    )
}

export default MobileSidebar;