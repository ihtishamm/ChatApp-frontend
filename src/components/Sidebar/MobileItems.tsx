
import clsx from 'clsx'

interface MobileidebarItemProps {
     label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    badge?: number;
    active: boolean;
    onClick: () => void;
    onBadgeClick?: () => void;
   
}

const MobileItem: React.FC<MobileidebarItemProps> = ({
     icon: Icon, active,onClick, onBadgeClick, label, badge
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
            {(badge && badge > 0) ? (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
                if(onBadgeClick) {
                  onBadgeClick();
                }
            }}>
              {badge}
            </span>
          ):null}
            </div>  
    
    )
}
export default MobileItem;