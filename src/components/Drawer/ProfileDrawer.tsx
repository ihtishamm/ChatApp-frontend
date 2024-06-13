// Drawer.js


const ProfileDrawer = ({ closeDrawer }) => {
    return (
        <div className="fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black opacity-50" onClick={closeDrawer}></div>
            <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white h-full shadow-lg transform transition-transform ease-in-out duration-300">
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

export default ProfileDrawer;
