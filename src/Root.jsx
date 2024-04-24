import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Navbar from './components/Navbar'
import useAuth from './hooks/useAuth'


const Root = () => {

const location = useLocation();

const {loading} = useAuth() || {};

const showHeader = [
    "/user/login",
    "/user/register",
    "/user/reset-password",
    "/user/phone-verification",
    "/user/profile",
    "/user/bookmark_surah"
  ].includes(location.pathname);

  return (
<>
{
   loading ? <div className='w-full min-h-screen bg-transparent backdrop-blur-sm flex items-center justify-center'>
   <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-[#1daeff]"></div>
 </div>
 :
 <>
  <Navbar></Navbar>
{
    !showHeader && <Header></Header>
}
<Outlet></Outlet>
<Footer></Footer>
 </>
}
</>
  )
}

export default Root