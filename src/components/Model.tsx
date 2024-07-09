import clsx from "clsx";
import { MdClose } from "react-icons/md";

interface ModelProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}


const Model:React.FC<ModelProps> = ({isOpen,onClose,children}) => {
    return (
        <div className={clsx(
            "fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center",
            isOpen ? "block" : "hidden"
        )}>
            <div className="bg-white w-96 p-5 rounded-lg">
                <div className="flex justify-end">
                    <button onClick={onClose}>
                        <MdClose size={20}/>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
export default Model;