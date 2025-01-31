export interface Friend {
    _id: string;
    fullName: string;
    avatar: string;
    email?:string;
    about:string;
  }
  
  
  export interface FriendResponse {
    data: Friend[];
    message: string;
  }


    export interface Request { 
        _id: string;
        status: string;
        sender: Friend;
        receiver: string;
        createdAt: string;
        updatedAt: string;
      }
      
      export interface RequestResponse {
        data: Request[];
        message: string;
      }


      export interface User {
        _id: string;
        fullName: string;
        userame: string;
        email: string;
        avatar: string;
        about:string;
        createdAt: string;
        updatedAt: string;
        token: string;
      }

       export interface UserResponse {
        data:User
       }
  