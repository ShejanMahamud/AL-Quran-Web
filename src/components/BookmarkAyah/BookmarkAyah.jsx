import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookmarkAyah = ({ayah}) => {
    const arabicLang = ayah[2];
    const englishLang = ayah[0];
    const banglaLang = ayah[1];

    const navigate = useNavigate();

    const handleAyahToAyah = () => {
        navigate(`/ayah/${arabicLang.number}`);
        window.scrollTo(0, 0)
    }

    // const arabicNumber = arabicLang.number.toLocaleString('ar-EG');

  return (
    <div onClick={handleAyahToAyah} className="border border-gray-700 hover:border-[#32B7C5] px-10 py-10 mx-auto flex lg:flex-row flex-col gap-10 items-center justify-between rounded-2xl w-full my-5 group hover:bg-[#32B7C5] hover:bg-opacity-5">

      <div className='text-right flex gap-3 items-center justify-between w-full'>
      <div className=" flex items-center justify-center font-poppins group">
        <div className=''>
        <svg className='group-hover:fill-[#32B7C5] group-hover:rotate-45 group-hover:scale-90 group-hover:duration-300' width="60" height="60" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 1.76172L26.1411 6.30691L32 4.44121L33.3137 10.448L39.3205 11.7617L37.4548 17.6206L42 21.7617L37.4548 25.9028L39.3205 31.7617L33.3137 33.0754L32 39.0822L26.1411 37.2165L22 41.7617L17.8589 37.2165L12 39.0822L10.6863 33.0754L4.67949 31.7617L6.54519 25.9028L2 21.7617L6.54519 17.6206L4.67949 11.7617L10.6863 10.448L12 4.44121L17.8589 6.30691L22 1.76172Z" stroke="#32B7C5" stroke-width="2"/>
</svg>
        </div>
        <span className='absolute font-bold p-2 text-lg group-hover:text-white group-hover:text-base'>{arabicLang.number}</span>
    </div>
        
        <div className='flex flex-col'>
        <h1 className='lg:text-xl text-lg font-noto-naskh-arabic text-white'>{arabicLang.text}</h1>
        <span>{arabicLang.surah.englishName}</span>
        <span className='text-xs'>({arabicLang.surah.englishNameTranslation})</span>
        </div>
      </div>
    </div>
  )
}

export default BookmarkAyah