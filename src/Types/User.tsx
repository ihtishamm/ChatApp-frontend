export interface Friend {
    _id: string;
    fullName: string;
    avatar: string;
  }
  
  
  export interface FriendResponse {
    data: Friend[];
    message: string;
  }