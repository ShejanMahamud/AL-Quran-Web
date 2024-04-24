import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import OTPInput from "otp-input-react";
import React, { useState } from "react";
import toast from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import auth from '../firebase/firebase.config';

const PhoneVerification = () => {
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate()
  const inputStyle = {
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
  };

  const dropdownStyle = {
    backgroundColor: '#121C26',
    backdropFilter: 'blur(10px)',
  };

  const onCaptchaVerify = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        handlePhoneVerification();
      }
    });
  }

  const handlePhoneVerification = (e) => {
    e.preventDefault();
    onCaptchaVerify()
    const appVerifier = window.recaptchaVerifier;
    const newPhone = '+' + phone;
    
    signInWithPhoneNumber(auth, newPhone, appVerifier)
    .then(res => {
      window.confirmationResult = res;
      setShowOtp(true);
      toast.success('Successfully Sent OTP!');

    })
    .catch(error => {
      toast.error(error.message)
    })

  }


  const handleOtpVerification = (e) => {
    e.preventDefault();
    confirmationResult.confirm(otp).then((result) => {
      toast.success('Sign in Successfully!');
      setTimeout(()=>{
        navigate('/')
      },2000)

    }).catch((error) => {
      toast.error('OTP Wrong')
    });
  }

  return (
    <div className="w-full bg-[url('arabic.svg')] py-20">
      <div className="w-full min-h-screen mx-auto flex flex-col gap-5 items-center justify-center">
        <div className="lg:w-[40%] w-[90%] mx-auto flex flex-col items-center">
          <h1 className="mb-3 lg:text-2xl text-xl font-bold text-white uppercase tracking-wider">
            Sign in with phone
          </h1>

          <p className="mb-3 text-gray-500 font-medium text-sm">
            Go back to <Link className="underline text-[#32B7C5] font-bold" to={'/user/register'}>Login</Link>
          </p>

          {showOtp ? (
            <form onSubmit={handleOtpVerification} className="flex flex-col gap-5 items-center w-[90%] lg:my-10 my-5">
              <h1 className="mb-3 text-2xl font-bold text-white uppercase tracking-wider text-center w-full">Enter OTP</h1>
              <OTPInput autoFocus OTPLength={6} otpType="number" disabled={false} className="opt-container" value={otp} onChange={setOtp} />
              <button type="submit" className="bg-[#32B7C5] px-4 py-2 rounded-lg text-white w-[60%] mx-auto">
                VERIFY OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handlePhoneVerification} className="flex flex-col gap-5 items-start">
              <label className="input input-bordered flex items-center gap-2 bg-transparent w-full backdrop-blur-lg focus:outline-none">
                <PhoneInput inputStyle={inputStyle} buttonStyle={inputStyle} dropdownStyle={dropdownStyle} value={phone} onChange={setPhone} country={'bd'} />
              </label>
             
              <button type="submit" className="bg-[#32B7C5] px-4 py-2 rounded-lg text-white w-full" id='sign-in-button'>
                SEND OTP
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;
