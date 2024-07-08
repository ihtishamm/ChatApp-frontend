
import { lazy } from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom"
 const Home = lazy(()=> import("./pages/Home"))
 const Login = lazy(()=> import("./pages/Login"))
 const Register = lazy(()=> import("./pages/Register"))
 const Chat = lazy(()=> import("./pages/Chat"))
 const NotFound = lazy(()=> import("./pages/NotFound"))
function App() {

  return (
     <BrowserRouter>
     <Routes>
        <Route path="/" element={<Home/>}/>
       <Route path="/chat/:id" element={<Chat/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
     </BrowserRouter>
  )
}

export default App
