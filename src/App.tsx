
import { lazy } from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom"
 const Home = lazy(()=> import("./pages/Home"))
 const Login = lazy(()=> import("./pages/Login"))
 const Chat = lazy(()=> import("./pages/Chat"))
 const  FriendsList = lazy(() => import("./pages/friendslist"))
 const NotFound = lazy(()=> import("./pages/NotFound"))
 const  ConversationList = lazy(() => import("./pages/conversations"))
 const Notifications = lazy(() => import("./pages/notifications"))
function App() {

  return (
     <BrowserRouter>
     <Routes>
      
      <Route path="/" element={<ConversationList/>}/>
        <Route path="/chat" element={<Home/>}/>
       <Route path="/chat/:id" element={<Chat/>}/>
         <Route  path="/friends"  element={<FriendsList/>}/>
         <Route   path="/conversations" element={<ConversationList/>}/>
         <Route   path="/notifications" element={<Notifications/>}/>

          <Route path="/login" element={<Login/>}/>
     
       <Route path="*" element={<NotFound/>}/>
      </Routes>
     </BrowserRouter>
  )
}

export default App
