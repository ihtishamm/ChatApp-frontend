import { createContext, useContext } from "react";
import io from "socket.io-client";
import { useMemo } from "react";



import { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

const getSocketConnection = () => useContext(SocketContext)

const token = localStorage.getItem("site");
const SocketProvider = ({children}: {children: React.ReactNode}) => {

    const socket = useMemo(()  => io(import.meta.env.VITE_BACKEND_SOCKET_URL,{
         query:{token},
    withCredentials:true,
    reconnectionAttempts: 5,
        reconnectionDelay: 1000,

}),
    
    []);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export {SocketProvider, getSocketConnection};

