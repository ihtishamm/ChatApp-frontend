export interface Chat {
    _id: string;
    groupChat: boolean;
    avatar: string[];
    name: string;
    members: string[];
  }
  
  export interface GetMyChatsResponse {
    data: {
      transformedChat: Chat[];
    };
    message: string;
  }


   export interface GetChatDetailsResponse {
    data: {
      chat: Chat[];
    };
    message: string;
  }