import React, { useState } from 'react';
import { GoDotFill } from "react-icons/go";
import { LuBox } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const Surah = ({surah}) => {

        const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate();

const handleSurahDetails = () => {
        setIsLoading(true); // Show loader
    
        // Delay navigation by 2 seconds (2000 milliseconds)
        setTimeout(() => {
          setIsLoading(false); // Hide loader
          navigate(`/surah/${surah_id}`);
          window.scrollTo(0, 0)
        }, 4000);
      };

      const scrollToTop = () => {
        
    }

const {surah_id,surah_name,surah_ayat_number,surah_arabic_name,surah_makki_or_madina,surah_name_meaning} = surah;

  return (
   <div onClick={()=>{handleSurahDetails()}} className='border border-gray-700 hover:border-[#32B7C5] rounded-xl w-full'>
        {
                isLoading && <div className='w-full flex justify-center absolute right-0 left-0'>
                <span className="loading loading-spinner text-info loading-lg"></span>
                </div>
            }
<div className='group hover:bg-[#32B7C5] hover:bg-opacity-5 w-full flex items-center justify-between gap-5 px-5 py-5 rounded-xl'>
<div className=" flex items-center justify-center font-poppins">
        <div className=''>
        <svg className='group-hover:fill-[#32B7C5] group-hover:rotate-45 group-hover:scale-90 group-hover:duration-300' width="60" height="60" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 1.76172L26.1411 6.30691L32 4.44121L33.3137 10.448L39.3205 11.7617L37.4548 17.6206L42 21.7617L37.4548 25.9028L39.3205 31.7617L33.3137 33.0754L32 39.0822L26.1411 37.2165L22 41.7617L17.8589 37.2165L12 39.0822L10.6863 33.0754L4.67949 31.7617L6.54519 25.9028L2 21.7617L6.54519 17.6206L4.67949 11.7617L10.6863 10.448L12 4.44121L17.8589 6.30691L22 1.76172Z" stroke="#32B7C5" stroke-width="2"/>
</svg>
        </div>
        <span className='absolute font-bold p-2 text-lg group-hover:text-white group-hover:text-base'>{surah_id}</span>
    </div>
    <div>
       <div className='mb-3'>
       <h1 className='text-lg font-bold font-mukti'>{surah_name}</h1>
        <span className='font-normal text-sm font-mukti'>({surah_name_meaning})</span>
       </div>
       <div className='flex items-center gap-2'>
       <button className='bg-[#828282] px-2 h-8 w-20 flex items-center gap-1 bg-opacity-20 rounded-lg text-[#80909f] text-xs'><LuBox className='text-lg text-[#80909f]'/>{surah_makki_or_madina}</button>
        <GoDotFill className='text-[#80909f] text-xs'/>
        <button className='bg-[#828282] px-2 h-8 w-16 flex items-center justify-between gap-1 bg-opacity-20 rounded-lg text-[#80909f] text-xs'><svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.1666 15.7619C8.79845 14.972 7.24646 14.5562 5.66663 14.5562C4.0868 14.5562 2.5348 14.972 1.16663 15.7619V2.76192C2.5348 1.97201 4.0868 1.55615 5.66663 1.55615C7.24646 1.55615 8.79845 1.97201 10.1666 2.76192M10.1666 15.7619C11.5348 14.972 13.0868 14.5562 14.6666 14.5562C16.2465 14.5562 17.7985 14.972 19.1666 15.7619V2.76192C17.7985 1.97201 16.2465 1.55615 14.6666 1.55615C13.0868 1.55615 11.5348 1.97201 10.1666 2.76192M10.1666 15.7619V2.76192" stroke="#828282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

 {surah_ayat_number}</button>
       </div>
    </div>
    <p className='font-bold text-base lg:text-lg font-noto-naskh-arabic text-right'>{surah_arabic_name}</p>
</div>
        </div>

  )
}

export default Surah