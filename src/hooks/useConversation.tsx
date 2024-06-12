import { useParams } from "react-router-dom";
import { useMemo } from "react";

const useConversation = () => {
     const params = useParams();
    const conversationId = useMemo(() => {
        if(!params.conversationId) return null;
        return params.conversationId;
    }, [params?.conversationId]);
    const isOpen = useMemo(() => !!conversationId, [conversationId]);
   
    return useMemo(() => ({ conversationId, isOpen }), [conversationId, isOpen])
};
export default useConversation;