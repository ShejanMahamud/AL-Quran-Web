import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { default as React, createContext, useEffect, useState } from "react";

import auth from "../../firebase/firebase.config";
export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userCreate = (email,password) => {
    return createUserWithEmailAndPassword(auth,email,password)
  }

  // Logged in or out checking
  useEffect(() => {
    try{
      const unSubscribe = onAuthStateChanged(auth, user => {
        setUserInfo(user);
        setIsLoggedIn(true);
   });
   return () => unSubscribe();
    } catch(error){
      console.log('An Error occurred!',error)
    }
   }, []);
  
   if (!isLoggedIn) {
     return (
       <div className="min-h-screen w-full flex items-center justify-center bg-transparent">
         <span className="loading loading-spinner loading-lg text-info"></span>
       </div>
     );
   }

   // Google popup signin
  
const loginWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();
 return signInWithPopup(auth,googleProvider)
}

//Twitter Login

const loginWithTwitter = () => {
  const twitterProvider = new TwitterAuthProvider();
  return signInWithPopup(auth,twitterProvider)
}

  // Email Pass signin to account
 const loginUser = (email,password) => {
  return signInWithEmailAndPassword(auth,email,password)
 }

  // signout user
  const logOut = () => {
  return signOut(auth)
  }

  const authContext = { userCreate, loginUser, userInfo, isLoggedIn, logOut,loginWithGoogle,loginWithTwitter };

  return (
    <AuthContext.Provider value={authContext}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider