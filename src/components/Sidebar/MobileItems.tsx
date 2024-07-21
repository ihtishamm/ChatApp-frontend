
import clsx from 'clsx'

interface MobileidebarItemProps {
     label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    active: boolean;
    onClick: () => void;
   
}

const MobileItem: React.FC<MobileidebarItemProps> = ({
     icon: Icon, active,onClick
}) => {
    return (
        <div onClick={onClick}

        
         className={
            clsx(`group flex gap-x-3 rounded-md p-3 text-sm leading-6
             font-semibold w-full justify-center  text-gray-600 hover:bg-gray-100
            `,
            active ? "bg-gray-100 text-black" : "")
         }>
            <Icon className="h-6 w-6"/>
            </div>  
    )
}
export default MobileItem;