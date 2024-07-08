
import { lazy } from "react"
import { QueryClient, QueryClientProvider } from  "@tanstack/react-query"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import ProtectedRoutes from "./components/auth/ProtectedRoutes"
 const Home = lazy(()=> import("./pages/Home"))
 const Login = lazy(()=> import("./pages/Login"))
 const Register = lazy(()=> import("./pages/Register"))
 const Chat = lazy(()=> import("./pages/Chat"))
 const NotFound = lazy(()=> import("./pages/NotFound"))
function App() {
  const user = false
 const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
     <BrowserRouter>
     <Routes>
     <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
     <Route element={<ProtectedRoutes user={user} children={undefined} />}>
       <Route path="/" element={<Home />} />
      <Route path="/chat/:id" element={<Chat />} />
     </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
     </BrowserRouter>
     </QueryClientProvider>
  )
}

export default App
