import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const UserApp = () => {
  return (
    <div>
       <Navbar></Navbar>
       <Outlet/>
        <Footer></Footer>
    </div>
  )
}

export default UserApp