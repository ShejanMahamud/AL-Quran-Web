import React from 'react'
import { Helmet } from 'react-helmet-async'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import SurahSection from '../SurahSection/SurahSection'

const Home = () => {
  return (
    <>
    <Helmet>
      <title>Al-Quran Bangla | Read & Listen Quran in Bangla</title>
      <link rel="canonical" href="https://alquran-bangla.netlify.app/" />
    </Helmet>
    <Navbar></Navbar>
    <Header></Header>
    <SurahSection></SurahSection>
    <Footer></Footer>
    </>
  )
}

export default Home