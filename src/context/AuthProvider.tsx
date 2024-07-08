import { useContext, createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define the shape of the context value
interface AuthContextType {
  token: string;
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  logOut: () => void;
}

// Define the user object structure
interface User {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Define the login data structure
interface LoginData {
  email: string;
  password: string;
}

// Define the login response structure
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
  const navigate = useNavigate();

  const login = async (data: LoginData) => {
    try {
      const response = await axios.post<LoginResponse>(`http://localhost:3000/api/v1/user/login`, data);
      const res = response.data;
      if (res.success) {
        setUser(res.data.user);
        setToken(res.data.accessToken);
        localStorage.setItem("site", res.data.accessToken);
        navigate("/");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {

  const response =  await axios.post(`http://localhost:3000/api/v1/user/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      console.log(response.data);
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logOut }}>
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


