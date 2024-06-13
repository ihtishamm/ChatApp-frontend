/* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react-refresh/only-export-components */
// import { useParams } from "react-router-dom"
// import AppLayout from "@/layout/AppLayout"
// import Header from "@/Section/Chat/Header";
// import Body from "@/Section/Chat/Body";
// import SendMessage from "@/Section/Chat/SendMessage";

// const Chat = () => {
//        const params = useParams();
//         console.log(params)
//     return(
//           <div className="hidden lg:block lg:pl-80 h-full h-screen">
//             <div className="h-full flex flex-col">
//                   <Header/>
//                   <Body/>
//                   <SendMessage/>
//             </div>
//           </div>
//     )
//  }

//  export default AppLayout()(Chat)


import { useState } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import Header from "@/Section/Chat/Header";
import Body from "@/Section/Chat/Body";
import SendMessage from "@/Section/Chat/SendMessage";
import ChatDrawer from "@/components/Drawer/ChatDrawer";

const Chat = () => {
    const params = useParams();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className="h-full h-screen lg:pl-80">
            <div className="h-full flex flex-col">
                <Header toggleDrawer={toggleDrawer} />
                <Body />
                <SendMessage />
            </div>
            {isDrawerOpen && <ChatDrawer closeDrawer={() => setIsDrawerOpen(false)} />}
        </div>
    );
};

export default AppLayout()(Chat);
