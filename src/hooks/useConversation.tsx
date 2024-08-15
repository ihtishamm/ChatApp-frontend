import { useParams } from "react-router-dom";
import { useMemo } from "react";

const useConversation = () => {
     const params = useParams();
     console.log("params", params); 
    const conversationId = useMemo(() => {
        if(!params.id) return null;
        return params.id;
    }, [params?.id]);

    console.log("conversationId", conversationId);
    const isOpen = useMemo(() => !!conversationId, [conversationId]);
   
    return useMemo(() => ({ conversationId, isOpen }), [conversationId, isOpen])
};
export default useConversation;