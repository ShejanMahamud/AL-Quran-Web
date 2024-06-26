import axios from 'axios';
import { default as React, useRef, useState } from 'react';
import 'react-h5-audio-player/lib/styles.css';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { FaBookmark, FaPause, FaPlay } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoArrowBackCircle } from "react-icons/io5";
import { LuBox } from "react-icons/lu";
import ReactPaginate from 'react-paginate';
import { useLoaderData, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Ayahs from '../components/Ayahs';
import useAuth from '../hooks/useAuth';

const SurahDetails = () => {
  const [isPlaying, setIsPlaying] = useState(null);
  const navigate = useNavigate();
  const data = useLoaderData();
  const audio = data.audio.audio_file.audio_url;
  const banglaLang = data.surah.data[1];
  const { number, name, englishName, englishNameTranslation, revelationType, numberOfAyahs, ayahs, edition } = data.surah.data[2];
  const {user} = useAuth() || {};
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; 

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleGoBack = () => {
    navigate('/')
    window.scrollTo(0, 0)
  }

  const offset = currentPage * itemsPerPage;
  const paginatedAyahs = ayahs.slice(offset, offset + itemsPerPage);


  const audioRef = useRef(null);

  const handleAudio = () => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        console.log(audio)
      }
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  }

  const handleBookMarkSurah = (id) =>{
    if(!user){
      toast.error('Please Login First!');
      return;
    }
   axios.post('http://localhost:5947/bookmark_surah',{
     email : user.email,
     surahId : id
   })
   .then(res => {
    if(res.data.insertedId){
      toast.success('Successfully Added to Bookmark')
    }
   })
  }

  return (
    <main className='h-auto w-full mb-5' id='ontop'>
      <Helmet>
        <title>{englishName} | Al-Quran Bangla</title>
        <link rel="canonical" href={`https://alquran-bangla.netlify.app/surah/${number}`} />
      </Helmet>
      <div className='w-full grid grid-cols-1 row-auto items-start -mt-5'>
      <div className={`bg-[#1C2733] px-10 py-10 mx-auto flex justify-center flex-col items-center gap-3 rounded-2xl w-[90%] mb-5 ${revelationType === "Meccan" ? "bg-[url('https://i.ibb.co/f9szXvM/makkah-dark.png')]" : "bg-[url('https://i.ibb.co/p3ncHhy/madinah-dark.png')]"} bg-no-repeat bg-left bg-contain`}>
        <h1 className='text-3xl font-noto-naskh-arabic text-white'>{name}</h1>
        <div className='mb-3'>
          <h1 className='text-xl font-bold text-white'>{englishName}</h1>
          <span className='font-normal text-sm text-[#80909f]'>({englishNameTranslation})</span>
        </div>
        <div className='flex items-center gap-3'>
          <button className='bg-[#828282] px-2 h-8 w-20 flex items-center gap-1 bg-opacity-20 rounded-lg text-white text-xs'><LuBox className='text-lg text-white' />{revelationType}</button>
          <GoDotFill className='text-white text-xs' />
          <button className='bg-[#828282] px-2 h-8 w-16 flex items-center justify-between gap-1 bg-opacity-20 rounded-lg text-white text-xs'><svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.1666 15.7619C8.79845 14.972 7.24646 14.5562 5.66663 14.5562C4.0868 14.5562 2.5348 14.972 1.16663 15.7619V2.76192C2.5348 1.97201 4.0868 1.55615 5.66663 1.55615C7.24646 1.55615 8.79845 1.97201 10.1666 2.76192M10.1666 15.7619C11.5348 14.972 13.0868 14.5562 14.6666 14.5562C16.2465 14.5562 17.7985 14.972 19.1666 15.7619V2.76192C17.7985 1.97201 16.2465 1.55615 14.6666 1.55615C13.0868 1.55615 11.5348 1.97201 10.1666 2.76192M10.1666 15.7619V2.76192" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> {numberOfAyahs}</button>
<button onClick={()=>handleBookMarkSurah(number)}><FaBookmark className='text-[#32B7C5] focus:outline-none text-2xl' data-tooltip-id="bookmark"
            data-tooltip-content="Bookmark Surah"
            data-tooltip-place="top" /></button>

<button onClick={handleAudio}>
            {isPlaying ? (
              <FaPause className='text-[#32B7C5] focus:outline-none' data-tooltip-id="play"
                data-tooltip-content="Pause"
                data-tooltip-place="top" />
            ) : (
              <FaPlay className='text-[#32B7C5] focus:outline-none' data-tooltip-id="play"
                data-tooltip-content="Play"
                data-tooltip-place="top" />
            )}
          </button>

<button onClick={handleGoBack}><IoArrowBackCircle className='text-[#32B7C5] focus:outline-none text-3xl' data-tooltip-id="back"
            data-tooltip-content="Back To Surah"
            data-tooltip-place="top" /></button>
        </div>
      </div>
        <div className='w-full mb-5'>
          {paginatedAyahs.map(ayah => (
            <Ayahs
              key={ayah.number}
              arbiAyah={ayah}
              surahNumber={number}
              banglaAyah={banglaLang.ayahs.find(banglaAyah => banglaAyah.number === ayah.number)}
            />
          ))}
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(ayahs.length / itemsPerPage)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName={'flex justify-center gap-3 items-center font-poppins text-xs'}
            activeClassName={'bg-[#32B7C5] text-white px-3 py-2 rounded-lg font-medium'}
  pageLinkClassName={'bg-transparent text-white rounded-lg font-medium'}
  previousLinkClassName={'bg-[#32B7C5] text-white px-4 py-2 rounded-lg font-medium'}
  nextLinkClassName={'bg-[#32B7C5] text-white px-4 py-2 rounded-lg font-medium'}
  disabledClassName={'pointer-events-none opacity-50'}
          />
        </div>
      </div>
      {audio && <audio ref={audioRef} src={audio} onEnded={handleAudioEnd} />}
    </main>
  );
}

export default SurahDetails;
