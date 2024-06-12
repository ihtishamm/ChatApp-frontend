 import clsx from "clsx"
 import { Link } from "react-router-dom";

 interface DesktopSidebarItemProps {
    href: string;
    label: string;
    icon: any;
    active: boolean;
    onClick: () => void;
 }

const DesktopSidebarItem: React.FC<DesktopSidebarItemProps> = ({
    href, label, icon:Icon, active, onClick
}) => {
    const handleClick = () => { 
        if(onClick){
            return onClick();
        }
    }
 return (
        <li onClick={handleClick}>
        <Link to={href} 
          className={
            clsx(`group flex gap-x-3 rounded-md p-3 text-sm leading-6
             font-semibold text-gray-600 hover:bg-gray-100
            `,
            active ? "bg-gray-100 text-gray-900" : "")
          }>
          <Icon  className="h-6 w-6 shrink-0"/>
          <span className="sr-only">{label}</span>
        </Link>
        </li>
 )
}
export default DesktopSidebarItem;