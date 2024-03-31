import {
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { default as React, createContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase/firebase.config";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
export const AuthContext = createContext(null);

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Logged in or out checking
  useEffect(() => {
   const unSubscribe = onAuthStateChanged(auth, (user) => {
    setUserInfo(user);
    });
    return () => unSubscribe()
  }, []);

  // Google popup signin
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        toast.success(`Successfully Logged in! ${res.user.displayName}`);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        toast.error("Unexpected Request!");
      });
  };

  // Email Pass signin to account
  const handleForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (res.user.emailVerified) {
          toast.success("Sucessfully Logged in");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          sendEmailVerification(auth.currentUser).then((res) => {
            toast.error("Please verify email first!");
          });
        }
      })
      .catch((error) => toast.error(error.message));
    e.target.password.value = "";
    e.target.email.value = "";
  };

  // signout user
  const handleSignOut = () => {
    signOut(auth)
    .then(res => {
      toast.success('Successfully Logged Out!')
    })
  }

  const showHeader = ![
    "/user/login",
    "/user/register",
    "/user/reset-password",
    "/user/phone-verification",
  ].includes(location.pathname);

  const authContext = { handleForm, handleGoogleLogin, userInfo, handleSignOut };

  return (
    <>
      <Helmet>
        <title>Al-Quran Bangla | Read & Listen Quran in Bangla</title>
        <link rel="canonical" href="https://alquran-bangla.netlify.app/" />
      </Helmet>
      <AuthContext.Provider value={authContext}>
        <Navbar></Navbar>
        {showHeader && <Header></Header>}
        <Outlet />
        <Footer></Footer>
      </AuthContext.Provider>
      <Toaster />
    </>
  );
};

export default Home;
