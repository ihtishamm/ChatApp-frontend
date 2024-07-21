
import clsx from "clsx";
import { Link } from "react-router-dom";

interface DesktopSidebarItemProps {
    href: string;
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    badge: number | undefined;
    active: boolean;
}

const DesktopSidebarItem: React.FC<DesktopSidebarItemProps> = ({
    href, label, icon: Icon, active, badge
}) => {
    return (
        <li>
            <Link
                to={href}
                className={clsx(
                    `group relative flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-600 hover:bg-gray-100`,
                    active ? "bg-gray-100 text-gray-900" : ""
                )}
            >
                <div className="relative flex items-center">
                    <Icon className="h-6 w-6 shrink-0" />
                    {badge && (
                        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {badge}
                        </span>
                    )}
                </div>
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    );
}

export default DesktopSidebarItem;
