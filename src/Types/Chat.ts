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