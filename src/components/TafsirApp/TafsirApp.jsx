import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'

const TafsirApp = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Header></Header>
        <Outlet/>
        <Footer></Footer>
    </div>
  )
}

export default TafsirApp