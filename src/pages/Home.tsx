import EmptyPage from '@/components/Custom/EmptyPage'
import AppLayout from '@/layout/AppLayout'

const Home = ()  => {
  return (
         
     <div className="hidden lg:block lg:pl-80 h-full h-screen">
        <EmptyPage/>
     </div>
    

  )
}


export default AppLayout()(Home)