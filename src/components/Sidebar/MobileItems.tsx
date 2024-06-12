import {
    Link
} from "react-router-dom";
import clsx from 'clsx'

interface MobileidebarItemProps {
    href: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    active: boolean;
   
}

const MobileItem: React.FC<MobileidebarItemProps> = ({
    href, icon: Icon, active
}) => {
    return (
         <Link to={href}
         className={
            clsx(`group flex gap-x-3 rounded-md p-3 text-sm leading-6
             font-semibold w-full justify-center  text-gray-600 hover:bg-gray-100
            `,
            active ? "bg-gray-100 text-black" : "")
         }>
            <Icon className="h-6 w-6"/>
         </Link>    
    )
}
export default MobileItem;