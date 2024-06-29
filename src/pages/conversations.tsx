import ConversationsList from "@/Section/AllConversationsList/AllConversationsList"
import AppLayout from "@/layout/AppLayout";
const Conversations = ()=> {
    return (
        <ConversationsList/>
    )
}

export default AppLayout()(Conversations);