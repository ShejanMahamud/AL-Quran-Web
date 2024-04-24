import React, { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle, FcIphone } from "react-icons/fc";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const recaptcha = useRef(null);
  const inputRef = useRef(null);
  const [showPass, setShowPass] = useState(false);
  const {user,loginUser,loginWithGoogle,loginWithTwitter} = useAuth() || {};
  const location = useLocation()
  const from = location?.state || '/';

  const handleForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if(!recaptcha.current.getValue()){
      toast.error('Please Submit Captcha');
      return;
    }
    loginUser(email, password)
      .then((res) => {
        toast.success("Sucessfully Logged in");
          e.target.reset();
          setTimeout(() => {
            navigate(from)
          }, 1000);
      })
      .catch((error) => toast.error('Something Went Wrong!'));
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await loginWithGoogle();
      toast.success(`Successfully Logged in! ${res.user.displayName}`);
      setTimeout(() => {
        navigate(from);
      }, 1000);
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };
  

  const handleTwitterLogin = () => {
    loginWithTwitter()
      .then((res) => {
        toast.success(`Successfully Logged in! ${res.user.displayName}`);
        setTimeout(() => {
         navigate(from);
        }, 1000);
      })
      .catch((error) => {
        toast.error("Something Went Wrong!");
      });
  };

  useEffect(()=>{
    inputRef.current.focus();
  },[])
 
  return (
    <div className="w-full bg-[url('arabic.svg')] py-20">
      <div className="w-full min-h-screen mx-auto flex flex-col gap-5 items-center justify-center">
        <div className="lg:w-[40%] w-[90%] mx-auto">
          <h1 className="mb-3 text-2xl font-bold text-white uppercase tracking-wider">
            Login
          </h1>
          
          <p className="mb-3 text-gray-500 font-medium text-sm">
          Not Registered? Register <Link className="underline text-[#32B7C5] font-bold" to={'/user/register'}>Here</Link>
          </p>
          <form
            onSubmit={handleForm}
            className="flex flex-col gap-5 items-start w-full"
          >
            <label className="input input-bordered flex items-center gap-2 bg-transparent w-full backdrop-blur-lg focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                name="email"
                className="grow focus:outline-none w-full"
                placeholder="Email"
                required
                ref={inputRef}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 bg-transparent backdrop-blur-lg w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                className="grow"
                placeholder="Password"
                required
              />
              <button onClick={() => setShowPass(!showPass)} type="button">
                {showPass ? <IoEyeOff /> : <IoEye />}
              </button>
            </label>
            <p className=" text-gray-500 font-medium text-sm">
              <Link className="hover:underline text-[#32B7C5]" to={'/user/reset-password'}>Forget Password?</Link>
          </p>
          <ReCAPTCHA sitekey={import.meta.env.VITE_SITE_KEY} ref={recaptcha}/>
            <button
              type="submit"
              className="bg-[#32B7C5] px-4 py-2 rounded-lg text-white w-full"
            >
              Submit
            </button>
          </form>

          <div className="flex items-center justify-center w-full gap-5 mt-5">
            <button onClick={handleGoogleLogin} className="bg-white rounded-lg px-2 py-2 text-2xl">
              <FcGoogle />
            </button>
            <button onClick={()=>navigate('/user/phone-verification')} className="bg-white rounded-lg px-2 py-2 text-2xl">
              <FcIphone />
            </button>
            <button onClick={handleTwitterLogin} className="bg-white rounded-lg px-2 py-2 text-2xl text-[#32B7C5]">
              <FaXTwitter />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
