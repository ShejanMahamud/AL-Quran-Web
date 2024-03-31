import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useContext, useState } from "react";
import { FaUserPen } from "react-icons/fa6";
import { FcGoogle, FcIphone } from "react-icons/fc";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "../../firebase/firebase.config";
import { AuthContext } from "../Home/Home";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const {handleGoogleLogin} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const checked = e.target.terms.checked;
    const name = e.target.name.value;

    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      toast.error("Password Must Contain Uppercase & LowerCase");
      return;
    } else if (!password.length > 8) {
      toast.error("Password should be 8 characters long!");
      return;
    } else if (!checked) {
      toast.error("Please accept our terms");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        sendEmailVerification(res.user)
        .then(res => {
            updateProfile(auth.currentUser, {
                displayName: name
            })
            .then(res => {
                toast.success("Sucessfully Registered");
                setTimeout(()=>{
                    navigate('/user/login')
                },5000);
                
            })
            .catch(error => {
                toast.error("Already User! Please Login")
            })
        })

      })
      
    e.target.password.value = "";
    e.target.email.value = "";
  };

  return (
    <div className="w-full bg-[url('arabic.svg')] py-20">
      <div className="w-full min-h-screen mx-auto flex flex-col gap-5 items-center justify-center">
        <div className="w-[40%] mx-auto">
          <h1 className="mb-3 text-2xl font-bold text-white uppercase tracking-wider">
            Register
          </h1>
          <p className="mb-3 text-gray-500 font-medium text-sm">
          Already User? Login <Link className="underline text-[#32B7C5] font-bold" to={'/user/login'}>Here</Link>
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
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 bg-transparent w-full backdrop-blur-lg focus:outline-none">
            <FaUserPen />
              <input
                type="text"
                name="name"
                className="grow focus:outline-none w-full"
                placeholder="Display Name"
                required
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

            <label htmlFor="terms" className="flex items-center gap-2">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                className="checkbox"
              />
              <span>Accept our terms and conditions</span>
            </label>
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
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Register;
