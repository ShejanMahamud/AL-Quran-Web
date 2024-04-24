import { sendEmailVerification } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { MdOutlineInsertPhoto, MdVerified } from "react-icons/md";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import auth from '../firebase/firebase.config';
import useAuth from './../hooks/useAuth';

const Profile = () => {

  const inputRef = useRef(null);

  const [editProfile,setEditProfile] = useState(false)

  const {user,profileUpdate,setUpdateUser} = useAuth() || {};

  const handleResendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
    .then(res => {
        toast.success('Email Verification Send!')
    })
    .catch(error => toast.error('Something Went Wrong!'))
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    profileUpdate(name,photo)
    .then(res => {
        toast.success('Profile Updated!');
        setUpdateUser(true)
    })
    .catch(error => toast.error('Soemthing Went Wrong!'))
  }

  useEffect( () => {
    inputRef.current.focus();
  },[])

  return (
    <div className="w-full flex flex-col items-center justify-center h-full py-28 lg:px-40 md:px-20 px-5 font-dmsans">
      <Helmet>
      <title>Update Profile | JohuHousing</title>
        <link rel="canonical" href="https://alquran-bangla.netlify.app/profile" />
      </Helmet>
        <div className="bg-[#1252ae1f] rounded-full w-40 h-40 mx-auto border border-[#1252ae26] mb-5 flex items-center justify-center relative">
       {
        user?.emailVerified &&  <MdVerified data-tooltip-id="verified" data-tooltip-content="Email Verified" className='text-[#1daeff] absolute top-5 text-4xl right-0'/>
       }
          <img src={user?.photoURL || 'https://i.ibb.co/L84TwCP/logo.png'} alt="logo.png" className='w-38 h-38 rounded-full object-cover'/>
        </div>
        <h1 className="text-3xl font-bold mb-2">Hi, <span className='text-[#1daeff]'>{user?.displayName || 'User'}</span></h1>
        {
            !user?.emailVerified && <p className="text-[#737D8C] text-center w-[60%] mx-auto text-sm mb-3">Please verify your email. <span onClick={handleResendEmailVerification} className='text-[#1daeff] hover:underline hover:underline-offset-2 cursor-pointer'>Resend Email</span></p>
        }
        <p className="text-[#737D8C] text-center w-[60%] mx-auto text-sm mb-3">Update your profile.</p>

<form onSubmit={handleProfileUpdate} className="flex flex-col items-center justify-center w-full my-10 gap-5">

<label class="input input-bordered flex items-center gap-2 lg:w-[60%] md:w-[60%] w-[90%] mx-auto">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
  <input type="text" name='name' defaultValue={user?.displayName} class="grow" placeholder="Name" ref={inputRef} required onChange={()=>setEditProfile(true)}/>
</label>

<label class="input input-bordered flex items-center gap-2 lg:w-[60%] md:w-[60%] w-[90%] mx-auto">
<MdOutlineInsertPhoto />
  <input type="text" class="grow w-full" name='photo' placeholder="Photo URL" required defaultValue={user?.photoURL} onChange={()=>setEditProfile(true)}/>
</label>

<label className="input input-bordered flex items-center gap-2 lg:w-[60%] md:w-[60%] w-[90%] mx-auto" data-tooltip-id="email" data-tooltip-content="You can't edit email!">
    
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
  <input type="text" className="grow w-full" name="email" placeholder="Enter your email" required value={user?.email || 'No Email'} disabled/>
</label>

{
    editProfile ?
    <button type="submit" className="lg:w-[60%] md:w-[60%] w-[80%] mx-auto bg-[#1daeff] px-10 py-2 rounded-md text-white font-bold uppercase">Save Changes</button>
    :
    <button type="button" className="lg:w-[60%] md:w-[60%] w-[80%] mx-auto bg-[#1daeff] px-10 py-2 rounded-md text-white font-bold uppercase"> Edit Profile </button>
}
 
</form>
<Tooltip id='email' />
<Tooltip id='verified' />
      </div>
  )
}

export default Profile