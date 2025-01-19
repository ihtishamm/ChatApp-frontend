import { Friend } from "./User";

export interface Chat {
    _id: string;
    groupChat: boolean;
    avatar: string[];
    name: string;
    creator: string | null;
    members: Friend[];
  }
  export interface GetMyChatsResponse {
    data: {
      transformedChat: Chat[];
    };
    message: string;
  }


   export interface GetChatDetailsResponse {
    data:{
      chat:Chat
    };
  }

   export interface Attachment  {
    _id: string;
    url: string;
    filename: string;
  }

  export interface Message {
    _id: string;
    sender: {
      _id: string;
      fullName: string;
      avatar: string;
    };
    content: string;
    createdAt: string;
    attachments?: Attachment[];
  }
  
  export interface BodyProps {
    messages: Message[];
  }

  export interface MessageData {
    data: Message;
  }