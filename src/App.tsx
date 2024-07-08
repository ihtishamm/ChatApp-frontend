
import { lazy, Suspense } from "react"
import { QueryClient, QueryClientProvider } from  "@tanstack/react-query"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import PrivateRoute from "./components/auth/ProtectedRoutes"
import AuthProvider from "./context/AuthProvider"
 const Home = lazy(()=> import("./pages/Home"))
 const Login = lazy(()=> import("./pages/Login"))
 const Register = lazy(()=> import("./pages/Register"))
 const Chat = lazy(()=> import("./pages/Chat"))
 const NotFound = lazy(()=> import("./pages/NotFound"))
function App() {
 const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
     <BrowserRouter>
     <Suspense fallback={<div>Loading...</div>}>
      <AuthProvider>
     <Routes>
     <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route element={<PrivateRoute />}>
  
       <Route path="/" element={<Home />} />
      <Route path="/chat/:id" element={<Chat />} />
     </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </AuthProvider>
      </Suspense>
     </BrowserRouter>
     </QueryClientProvider>
  )
}

export default App
