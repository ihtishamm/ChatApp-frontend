import ConversationsList from "@/Section/AllConversationsList/AllConversationsList";
import Sidebar from "@/components/Sidebar/Sidebar";
import { JSX } from "react/jsx-runtime";


 const AppLayout = () => (WrappedComponent: React.ComponentType) => {
    return (props: JSX.IntrinsicAttributes) => {
        return (
            <Sidebar>
            <div className="h-full h-screen">
                 <ConversationsList/>
                <WrappedComponent {...props} />
            </div>
            </Sidebar>
        )
    }
 }

 export default AppLayout;