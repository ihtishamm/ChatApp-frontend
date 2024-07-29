import { createContext, useContext } from "react";
import io from "socket.io-client";
import { useMemo } from "react";




const SocketContext = createContext<any>(null);

const getSocketConnection = () => useContext(SocketContext)

const token = localStorage.getItem("site");
const SocketProvider = ({children}: {children: React.ReactNode}) => {

    const socket = useMemo(()  => io("http://localhost:3000",{
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
 
export {SocketProvider, getSocketConnection}