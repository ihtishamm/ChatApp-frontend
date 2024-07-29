import { useContext, createContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useRecieveRequest } from "@/hooks/useRequest";
import { User } from "@/Types/User";
import { useCurrentUser } from "@/hooks/useUserApi";

// Define the shape of the context value
interface AuthContextType {
  token: string;
  user: User | null;
  requestCount: number;
  login: (data: LoginData) => Promise<void>;
  logOut: () => void;
}

interface LoginData {
  email: string;
  password: string;
}
interface LoginResponse {
  statusCode: number;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  success: boolean;
}

// Define the type for the AuthProvider's children prop
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(localStorage.getItem("site") || "");
  const {data:userdata} = useCurrentUser();
  const navigate = useNavigate();
  const [requestCount, setRequestCount] = useState<number>(() => {
    const count = localStorage.getItem('requestCount');
    return count ? parseInt(count, 10) : 0;
  });


  const { data, error } = useRecieveRequest();

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch received requests", error);
    } else if (data) {
      const count = data.length || 0;
      setRequestCount(count);
      localStorage.setItem('requestCount', count.toString());
    }
  }, [data, error]);

  const login = async (data: LoginData) => {
    try {
      const response = await axios.post<LoginResponse>(`http://localhost:3000/api/v1/user/login`, data);
      const res = response.data;
      if (res.success) {
        toast.success("Login successful");
        setToken(res.data.accessToken);
        localStorage.setItem("site", res.data.accessToken);
        navigate("/");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      toast.error("Please enter correct email and password");
    }
  };
  useEffect(() => {
    if (!token || token === undefined || token === null) {
      navigate("/login");
    }

   if(userdata){
    setUser(userdata);
  }
  },[userdata, token]);

  const logOut = async () => {

  const response =  await axios.post(`http://localhost:3000/api/v1/user/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      console.log(response.data);
      if(response.data.success){
        toast.success("Logout successful");
      }
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ requestCount, token, user, login, logOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


