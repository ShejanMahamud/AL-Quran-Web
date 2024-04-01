import React, { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { FaPagelines } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoBookSharp } from "react-icons/io5";
import { MdBookmarkAdded } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingCompo from "../../Utils/LoadingCompo";
import { getBookMarkAyahFromLocalStorage, getBookMarkSurahFromLocalStorage } from "../../Utils/localStorage";
import { AuthContext } from "../AuthProvider/AuthProvider";
export const QuranContext = createContext(null);

const Dashboard = () => {
  const [bookmarkSurahs, setBookmarkSurahs] = useState([])
  const [surahs, setSurahs] = useState([])
  const [ayahs,setAyahs] = useState([])
  const { logOut, userInfo } = useContext(AuthContext);
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logOut();
      setTimeout(() => {
        toast.success("Successfully Logged Out!");
      }, 1000);
      
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/meta')
      .then(res => res.json())
      .then(data => {
        const allSurahs = data.data.surahs.references;
        setSurahs(allSurahs);
  
        const surahLS = getBookMarkSurahFromLocalStorage();
        const matchedSurahs = allSurahs.filter(surah => surahLS.includes(surah.number));
        setBookmarkSurahs(matchedSurahs);
      })
      .catch(error => {
        console.error('Error fetching surahs:', error);
      });
  }, []);
  

    useEffect(() => {
      const ayahLs = getBookMarkAyahFromLocalStorage();
      
      // Create an array of promises for each API call
      const fetchPromises = ayahLs.map(ayahId => {
        return fetch(`https://api.alquran.cloud/v1/ayah/${ayahId}/ar.alafasy`)
          .then(res => res.json())
          .then(data => data.data); // Extract the data from the response
      });
    
      // Wait for all promises to resolve
      Promise.all(fetchPromises)
        .then(allAyahsData => {
          // Combine all the data into a single array
          const combinedAyahs = allAyahsData.flat();
          setAyahs(combinedAyahs);
        })
        .catch(error => {
          // Handle any errors
          console.error('Error fetching ayahs:', error);
        });
    }, []);
  

    const quranInfo = {bookmarkSurahs,ayahs}
  
  return (

    <>
    {loading ? (
      <LoadingCompo />
    ) : (
      <div className="min-h-screen w-full grid grid-cols-[20%_80%] row-auto">
      <nav
        className={`w-full flex justify-between flex-col items-center py-5 shadow-2xl border-r-4 border-r-gray-900 bg-[url('footer.svg')] bg-[#121C26] bg-no-repeat bg-cover bg-center min-h-screen`}
      >
        <div className="flex items-center gap-2">
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

        <ul className="*:backdrop-blur-lg *:border-b *:border-t *:border-white *:border-opacity-10 w-full *:px-5 flex flex-col gap-2 *:py-3 *:text-start *:shadow-xl">
          <li>
            <button onClick={() => navigate("/user/dashboard")} className="flex items-center gap-2">
            <AiFillHome/><span>Home</span>
            </button>
          </li>
          <li>
          <button onClick={() => navigate("/user/dashboard/surah")} className="flex items-center gap-2">
            <IoBookSharp/><span>Surahs</span>
            </button>
          </li>
          <li>
          <button onClick={() => navigate("/user/dashboard")} className="flex items-center gap-2">
            <MdBookmarkAdded/><span>Ayahs</span>
            </button>
          </li>
          <li>
          <button onClick={() => navigate("/user/dashboard")} className="flex items-center gap-2">
            <FaPagelines /><span>Tafsir</span>
            </button>
          </li>
          <li>
          <button onClick={() => navigate("/user/dashboard/profile")} className="flex items-center gap-2">
            <FaUserEdit /><span>Profile</span>
            </button>
          </li>
        </ul>
        <div className="w-full flex items-center flex-col gap-2">
          <div className="flex items-center gap-2">
            <img
              src={userInfo?.photoURL || "user.png"}
              alt=""
              className="w-10 rounded-full"
            />
            <div className="flex flex-col">
              <h1 className="text-lg font-medium">
                {userInfo?.displayName || "User"}
              </h1>
              <p className="text-sm">{userInfo?.email || "user@user.com"}</p>
            </div>
          </div>
          <div className="flex items-center w-full">
            <div
              className="flex items-center w-full justify-center gap-1 text-base"
              onClick={handleLogOut}
            >
              <AiOutlineLogout /> <span>Sign Out</span>
            </div>
            <div
              className="flex items-center w-full justify-center gap-1 text-base"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  navigate("/");
                }, 2000);
              }}
            >
              <IoMdArrowRoundBack /> <span>Go Back</span>
            </div>
          </div>
        </div>
      </nav>
      <div className={`w-full`}>
        <QuranContext.Provider value={quranInfo}>
        <Outlet />
        </QuranContext.Provider>
      </div>
      <Toaster />
    </div>
    )}
  </>
      

  );
};

export default Dashboard;
