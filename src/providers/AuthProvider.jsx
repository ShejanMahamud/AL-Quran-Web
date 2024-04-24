import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import { default as React, createContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import auth from "../firebase/firebase.config";
export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateUser,setUpdateUser] = useState(false)

  const userCreate = (email,password) => {
    return createUserWithEmailAndPassword(auth,email,password)
  }

  // Logged in or out checking
useEffect(()=>{
  const unSubscribe = onAuthStateChanged(auth,currentUser=>{
    setUser(currentUser)
    setLoading(false)
  })
  return ()=> unSubscribe();
},[user])

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

 //Update User
 const profileUpdate = (name,photo) => {
  return updateProfile(auth.currentUser,{
    displayName: name,
    photoURL: photo
  })
 }

  // signout user
  const logOut = () => {
  return signOut(auth)
  }

  const authContext = { userCreate, loginUser, user, loading, logOut,loginWithGoogle,loginWithTwitter,setUpdateUser,profileUpdate };

  return (
    <AuthContext.Provider value={authContext}>
        {children}
        <Toaster
  position="top-right"
  reverseOrder={true}
/>
    </AuthContext.Provider>
  )
}

export default AuthProvider