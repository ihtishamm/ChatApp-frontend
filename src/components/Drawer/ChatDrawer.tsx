
const ChatDrawer = ({ closeDrawer }) => {
    return (
        <div className="fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black opacity-50" onClick={closeDrawer}></div>
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white h-full shadow-lg">
                <div className="p-4 flex justify-between items-center border-b">
                    <h3 className="text-lg font-bold">Drawer</h3>
                    <button onClick={closeDrawer} className="text-gray-600 hover:text-gray-900">
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    {/* Drawer content goes here */}
                </div>
            </div>
        </div>
    );
};

export default ChatDrawer;

