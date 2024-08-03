import { lazy, Suspense} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/auth/ProtectedRoutes";
import AuthProvider from "./context/AuthProvider";
import Loader from "./components/Custom/loader";
import { SocketProvider } from "./context/SocketContext";
import EventsProvider from "./context/EventsContext";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Chat = lazy(() => import("./pages/Chat"));
const NotFound = lazy(() => import("./pages/NotFound"));


function App() {
  return (
    
      <BrowserRouter>
        <Suspense fallback={<Loader/>}>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<SocketProvider> <EventsProvider> <PrivateRoute /></EventsProvider> </SocketProvider> }>
                <Route path="/" element={<Home />} />
                <Route path="/chat/:id" element={<Chat />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer />
          </AuthProvider>
        </Suspense>
      </BrowserRouter>
  );
}

export default App;
