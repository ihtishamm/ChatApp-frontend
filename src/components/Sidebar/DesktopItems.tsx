import clsx from "clsx";

interface DesktopSidebarItemProps {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  badge: number | undefined;
  active: boolean;
  onClick: () => void;
}

const DesktopSidebarItem: React.FC<DesktopSidebarItemProps> = ({
  label,
  icon: Icon,
  active,
  badge,
  onClick,
}) => {
  return (
    <li onClick={onClick}>
      <div
        className={clsx(
          `group relative flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer`,
          active ? "bg-gray-100 text-gray-900" : ""
        )}
      >
        <div className="relative flex items-center">
          <Icon className="h-7 w-7 shrink-0" />
          {badge && (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {badge}
            </span>
          )}
        </div>
        <span className="sr-only">{label}</span>
      </div>
    </li>
  );
};

export default DesktopSidebarItem;

