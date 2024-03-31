import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from '../../firebase/firebase.config';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
export const GoogleLoginContext = createContext(null)
const UserApp = () => {

  const googleProvider = new GoogleAuthProvider();
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
    .then(res => {
      toast.success(`Successfully Logged in! ${res.user.displayName}`)
    })
    .catch(error => {
      toast.error('Unexpected Request!')
    })
  }

  return (
    <div>
       <Navbar></Navbar>
       <GoogleLoginContext.Provider value={handleGoogleLogin}>
       <Outlet/>
       </GoogleLoginContext.Provider>
        <Footer></Footer>
        <ToastContainer></ToastContainer>
    </div>
  )
}

export default UserApp