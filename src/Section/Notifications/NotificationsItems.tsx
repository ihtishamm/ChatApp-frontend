import React from 'react';

interface NotificationItemProps {
    id: string;
    name: string;
    onAccept: (id: string) => void;
    onReject: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ id, name, onAccept, onReject }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm mb-2">
            <span className="font-semibold text-gray-800  mr-1">{name}</span>
            <div className="flex space-x-2">
                <button
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600"
                    onClick={() => onAccept(id)}
                >
                    Accept
                </button>
                <button
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                    onClick={() => onReject(id)}
                >
                    Reject
                </button>
            </div>
        </div>
    );
}

export default NotificationItem;
