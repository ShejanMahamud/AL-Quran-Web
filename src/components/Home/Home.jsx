import { default as React } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";


const Home = () => {

  const location = useLocation();
  
  const showHeader = [
    "/user/login",
    "/user/register",
    "/user/reset-password",
    "/user/phone-verification",
  ].includes(location.pathname);

  const showDashBoard = [
    "/user/dashboard",
    "/user/dashboard/profile",
    "/user/dashboard/surah"
  ].includes(location.pathname)

  return (
    <>
      <Helmet>
        <title>Al-Quran Bangla | Read & Listen Quran in Bangla</title>
        <link rel="canonical" href="https://alquran-bangla.netlify.app/" />
      </Helmet> 
      {!showDashBoard && <Navbar></Navbar>}
      {!showHeader && !showDashBoard && <Header></Header>}
      <Outlet />
      {!showDashBoard && <Footer></Footer>}
    </>
  );
};

export default Home;
