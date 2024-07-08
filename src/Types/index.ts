export type AuthState = {
    user: string | null;
    accessToken: string | null;
  };
  
  export type AuthContextType = {
    auth: AuthState;
    setAuth: (auth: AuthState) => void;
  };