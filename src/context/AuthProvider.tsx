import { createContext, useState, ReactNode,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { User } from "@/Types/User";

interface AuthContextType {
  token: string;
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  logOut: () => void;
  setToken: (token: string) => void;
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

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(localStorage.getItem("site") || "");
  const [refreshToken, setRefreshToken] = useState<string>(localStorage.getItem("refreshToken") || "");
  const navigate = useNavigate();

  const login = async (data: LoginData) => {
    try {
      const response = await axios.post<LoginResponse>(`http://localhost:3000/api/v1/user/login`, data);
      const res = response.data;
      if (res.success) {
        toast.success("Login successful");
        setToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        localStorage.setItem("site", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        navigate("/");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      toast.error("Please enter correct email and password");
    }
  };

  const logOut = async () => {
    await axios.post(`http://localhost:3000/api/v1/user/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Logout successful");
    setUser(null);
    setToken("");
    setRefreshToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  // const refreshAccessToken = async (): Promise<string> => {
  //   try {
  //     const response = await axios.post(`http://localhost:3000/api/v1/user/refresh-token`, {}, {
  //       headers: {
  //         Authorization: `Bearer ${refreshToken}`,
  //       },
  //     });

  //     const { accessToken } = response.data;
  //     setToken(accessToken);
  //     localStorage.setItem("site", accessToken);
  //     return accessToken;
  //   } catch (error) {
  //     logOut();
  //     throw error;
  //   }
  // };

  return (
    <AuthContext.Provider value={{ token, user, login, logOut, setToken }}>
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
