import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoBookmarkSlashFill } from "react-icons/go";
import { LuBox } from "react-icons/lu";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const BookmarkSurah = () => {
  const [surahs, setSurahs] = useState([]);
  const [bookmark,setBookmark] = useState([])
  const [loading,setLoading] = useState(true)
  const { user } = useAuth() || {};
  const {data} = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5947/bookmark_surah/${user?.email}`)
      .then((res) => {
        setSurahs(res.data);
        setLoading(false)
      })
      .catch((error) => toast.error("Something went wrong!"));
  }, [user]);


    useEffect(()=>{
      const search = data.filter(datos => surahs.some(surah => datos.surah_id === surah.surahId))
      setBookmark(search)
    },[surahs])

    const handleSurahDetails = (id) => {

      setIsLoading(true); // Show loader
      setTimeout(() => {
        setIsLoading(false); // Hide loader
        navigate(`/surah/${id}`);
        window.scrollTo(0, 0)
      }, 5000);
    };
  

  return (
    <div className="py-28 w-full min-h-screen flex items-center justify-center font-poppins bg-[url('arabic.svg')] bg-no-repeat bg-cover bg-center">
      {
        loading ? <p>Loading...</p> : surahs.length === 0 ? (
          <div className="flex flex-col items-center">
              <GoBookmarkSlashFill className="text-9xl text-[#1daeff]"/>
              <span className="text-white text-2xl my-2">No Bookmarked Surah Found!</span>
          </div>
        ) : (
          <div className="w-[90%] mx-auto">
            <h1 className="text-center text-white text-3xl font-mukti font-medium mb-5">আপনার সেইভ করে রাখা <span className="text-[#1daeff]">সূরাসমূহ</span></h1>
            <div className="w-full grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 row-auto items-center gap-5">
            {
              bookmark.map(surah => (
                <div className='border border-gray-700 hover:border-[#32B7C5] text-[#80909f] rounded-xl w-full backdrop-blur-md'>
        
                {
                        isLoading && <div className='w-full flex justify-center absolute right-0 left-0'>
                        <span className="loading loading-spinner text-info loading-lg"></span>
                        </div>
                    }
        <div className='group hover:bg-[#32B7C5] hover:bg-opacity-5 w-full flex items-center gap-5  py-5 px-5 rounded-xl justify-center'>
        <div className="flex items-center justify-center font-poppins">
                <div className=''>
                <svg className='group-hover:fill-[#32B7C5] group-hover:rotate-45 group-hover:scale-90 group-hover:duration-300' width="60" height="60" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 1.76172L26.1411 6.30691L32 4.44121L33.3137 10.448L39.3205 11.7617L37.4548 17.6206L42 21.7617L37.4548 25.9028L39.3205 31.7617L33.3137 33.0754L32 39.0822L26.1411 37.2165L22 41.7617L17.8589 37.2165L12 39.0822L10.6863 33.0754L4.67949 31.7617L6.54519 25.9028L2 21.7617L6.54519 17.6206L4.67949 11.7617L10.6863 10.448L12 4.44121L17.8589 6.30691L22 1.76172Z" stroke="#32B7C5" stroke-width="2"/>
        </svg>
                </div>
                <span className='absolute font-bold p-2 text-lg group-hover:text-white group-hover:text-base'>{surah?.surah_id}</span>
            </div>
            <div>
               <div className='mb-3'>
               <h1 className='text-lg font-bold font-mukti'>{surah?.surah_name} ({surah?.surah_arabic_name})</h1>
                <span className='font-normal text-sm font-mukti'>({surah?.surah_name_meaning})</span>
               </div>
               <div className='flex items-center gap-2'>
               <button className='bg-[#828282] px-2 h-8 w-20 flex items-center gap-1 bg-opacity-20 rounded-lg text-[#80909f] text-xs'><LuBox className='text-lg text-[#80909f]'/>{surah?.surah_makki_or_madina}</button>
                {/* <GoDotFill className='text-[#80909f] text-xs'/> */}
                <button className='bg-[#828282] px-2 h-8 w-16 flex items-center justify-between gap-1 bg-opacity-20 rounded-lg text-[#80909f] text-xs'><svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.1666 15.7619C8.79845 14.972 7.24646 14.5562 5.66663 14.5562C4.0868 14.5562 2.5348 14.972 1.16663 15.7619V2.76192C2.5348 1.97201 4.0868 1.55615 5.66663 1.55615C7.24646 1.55615 8.79845 1.97201 10.1666 2.76192M10.1666 15.7619C11.5348 14.972 13.0868 14.5562 14.6666 14.5562C16.2465 14.5562 17.7985 14.972 19.1666 15.7619V2.76192C17.7985 1.97201 16.2465 1.55615 14.6666 1.55615C13.0868 1.55615 11.5348 1.97201 10.1666 2.76192M10.1666 15.7619V2.76192" stroke="#828282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        
         {surah?.surah_ayat_number}</button>
         <button onClick={()=>handleSurahDetails(surah?.surah_id)} className='bg-[#32B7C5] px-2 h-8 flex items-center gap-1 text-white rounded-lg text-xs w-full justify-center'>
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M10 12.5C10.663 12.5 11.2989 12.2366 11.7678 11.7678C12.2366 11.2989 12.5 10.663 12.5 10C12.5 9.33696 12.2366 8.70107 11.7678 8.23223C11.2989 7.76339 10.663 7.5 10 7.5C9.33696 7.5 8.70107 7.76339 8.23223 8.23223C7.76339 8.70107 7.5 9.33696 7.5 10C7.5 10.663 7.76339 11.2989 8.23223 11.7678C8.70107 12.2366 9.33696 12.5 10 12.5Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.1025 9.53917C2.3425 5.81333 5.85667 3.125 10.0008 3.125C14.1425 3.125 17.655 5.81083 18.8967 9.53333C18.9967 9.835 18.9967 10.16 18.8967 10.4608C17.6575 14.1867 14.1425 16.875 9.99917 16.875C5.8575 16.875 2.34417 14.1892 1.10333 10.4667C1.00312 10.1656 1.00312 9.84021 1.10333 9.53917H1.1025ZM14.375 10C14.375 11.1603 13.9141 12.2731 13.0936 13.0936C12.2731 13.9141 11.1603 14.375 10 14.375C8.83968 14.375 7.72688 13.9141 6.90641 13.0936C6.08594 12.2731 5.625 11.1603 5.625 10C5.625 8.83968 6.08594 7.72688 6.90641 6.90641C7.72688 6.08594 8.83968 5.625 10 5.625C11.1603 5.625 12.2731 6.08594 13.0936 6.90641C13.9141 7.72688 14.375 8.83968 14.375 10Z" fill="white"/>
</svg>
         </button>
         <button className='bg-red-500 px-2 h-8 flex items-center gap-1 text-white rounded-lg text-xs w-full justify-center'>
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M3.33333 17.7778C3.33333 19.0056 4.32776 20 5.55557 20H14.4445C15.6722 20 16.6667 19.0056 16.6667 17.7778V4.44446H3.33333V17.7778Z" fill="white"/>
  <path d="M13.8889 1.11109L12.7778 0H7.22224L6.11109 1.11109H2.22224V3.33333H17.7778V1.11109H13.8889Z" fill="white"/>
</svg>
         </button>
               </div>
            </div>
        </div>
                </div>
              ))
            }
          </div>
          </div>
        )}
      
    </div>
  );
};

export default BookmarkSurah;
