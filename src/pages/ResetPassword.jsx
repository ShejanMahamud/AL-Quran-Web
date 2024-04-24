import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "../firebase/firebase.config";

const ResetPassword = () => {

  const handleForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailRegex.test(email)){
    toast.warning('Please enter valid email !');
    return;
}
    sendPasswordResetEmail(auth, email)
    .then(res => {
        toast.success('Password Reset Successfully!');
    })
    .catch(error => {
        toast.error('Unauthorized Request!')
    })

  };

  return (
    <div className="w-full bg-[url('arabic.svg')] py-20">
      <div className="w-full min-h-screen mx-auto flex flex-col gap-5 items-center justify-center">
        <div className="w-[40%] mx-auto">
          <h1 className="mb-3 text-xl font-bold text-white uppercase tracking-wider">
            Reset Password
          </h1>
          <p className="mb-3 text-gray-500 font-medium text-sm">
          Or go back to <Link className="underline text-[#32B7C5] font-bold" to={'/user/login'}>Login</Link>
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
           
            <button
              type="submit"
              className="bg-[#32B7C5] px-4 py-2 rounded-lg text-white w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ResetPassword;
