import EmptyPage from '@/components/Custom/EmptyPage'
import AppLayout from '@/layout/AppLayout'
// eslint-disable-next-line react-refresh/only-export-components
const Home = ()  => {
  return (
         
     <div className="hidden lg:block lg:pl-80 h-full h-screen">
        <EmptyPage/>
     </div>
    

  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default AppLayout()(Home)