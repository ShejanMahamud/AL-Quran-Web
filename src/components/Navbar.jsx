import React from "react";
import toast from "react-hot-toast";
import { FaRegBookmark, FaUser, FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user,logOut } = useAuth() || {};
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
    .then(res => {
      toast.success('Successfully Logged Out!')
    })
    .catch(error => {
      toast.error('Something went wrong!')
    })
  }

  return (
        <nav
          className={`w-full mx-auto shadow-2xl lg:py-2 py-3 font-k2d flex items-center justify-between px-5 lg:px-20 fixed top-0 backdrop-blur-lg z-50 border-b border-b-white border-opacity-10`}
        >
          <div onClick={()=>navigate('/')} className="flex items-center gap-2">
            <div className="bg-[#32B7C5] lg:h-14 h-10 lg:w-14 w-10 lg:rounded-xl rounded-md flex items-center justify-center">
              <img
                src="https://i.ibb.co/Kr4HN1m/quran.png"
                alt="quran.png"
                className="lg:w-8 w-6"
              />
            </div>
            <div className="flex flex-col items-start text-white">
              <span className={`lg:text-2xl text-lg font-mukti`}>আল কুরআন</span>
              <span className="text-xs font-mukti">কুরআন বাংলা</span>
            </div>
          </div>
         <div className="flex items-center gap-2">
         {
  user &&   <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
    <div className="w-10 rounded-full border-2 border-[#32B7C5]">
      <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
    </div>
  </div>
  <ul tabIndex={0} className="mt-3 z-[1] relative top-10 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
  <li className="font-bold py-2 px-4">Hi! {user?.displayName || "User"}</li>
            <button onClick={() => navigate("/user/profile")} className="flex items-center gap-2 font-medium hover:bg-gray-200 hover:text-gray-800 py-2 px-4 hover:rounded-lg">
              <FaUserCircle className="text-xl text-gray-400" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => navigate("/user/profile")}
              className="flex items-center gap-2 font-medium hover:bg-gray-200 py-2 px-4 hover:rounded-lg hover:text-gray-800"
            >
              <IoSettingsOutline className="text-xl" />
              <span>Settings</span>
            </button>
            <button
            onClick={()=>navigate('/user/bookmark_surah')}
              className="flex items-center gap-2 font-medium hover:bg-gray-200 py-2 px-4 hover:rounded-lg hover:text-gray-800"
            >
              <FaRegBookmark className="text-xl" />
              <span>Bookmark Surah</span>
            </button>
            <button
              onClick={handleLogOut}
              className="flex items-center gap-2 font-medium hover:bg-gray-200 py-2 px-4 hover:rounded-lg text-red-500"
            >
              <IoIosLogOut className="text-xl" />
              <span>Logout</span>
            </button>
  </ul>
</div>
}
{
  user ? <button onClick={handleLogOut} className="bg-[#32B7C5] px-4 py-2 rounded-lg text-white flex items-center gap-2">
  <FiLogOut /> Logout
</button> : <button
              onClick={() => navigate("/user/login")}
              className="bg-[#32B7C5] px-4 py-2 rounded-lg text-white flex items-center gap-2"
            >
              <FaUser /> Login
            </button>
}
         </div>
        </nav>
      )}

export default Navbar;
