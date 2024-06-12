
import { lazy } from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom"

 const Home = lazy(()=> import("./pages/Home"))
 const Login = lazy(()=> import("./pages/Login"))
 const Chat = lazy(()=> import("./pages/Chat"))
function App() {


  return (
     <BrowserRouter>
     <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/chat/:id" element={<Chat/>}/>
      </Routes>
     </BrowserRouter>
  )
}

export default App
