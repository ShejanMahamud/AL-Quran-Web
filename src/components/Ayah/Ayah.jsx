import React, { useRef, useState } from 'react';
import 'react-h5-audio-player/lib/styles.css';
import { FaBookOpen, FaBookmark, FaPause, FaPlay, FaShareAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoArrowBackCircle, IoCopy } from "react-icons/io5";
import { LuBox } from "react-icons/lu";
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { setAyahBookmarkToLocalStorage, setSurahBookmarkToLocalStorage } from '../../Utils/localStorage';

const Ayah = () => {
  
    const data = useLoaderData();
    const navigate = useNavigate();
    const {ayahNumber} = useParams();
    const handleGoBack = () => {
        navigate('/')
        window.scrollTo(0, 0)
      }

    const englishLang = data.data.data[0];
  const banglaLang = data.data.data[1];
  const { number, name, englishName, englishNameTranslation, revelationType, numberOfAyahs, ayahs, edition,text,audio } = data.data.data[2];

  const arabicNumber = number.toLocaleString('ar-EG');
  // State to track whether audio is playing or not
  const [isPlaying, setIsPlaying] = useState(false);
  const [copy, setCopy] = useState("Copy Ayah");

  // Ref to access the audio element
  const audioRef = useRef(null);

  const handleAudio = () => {
    // Toggle playback state directly
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  
    // If audioRef.current exists, play or pause the audio accordingly
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };
  

  // Function to handle audio end
  const handleAudioEnd = () => {
    setIsPlaying(false); // Set isPlaying to false when audio ends
  };



  const copyCode = () => {
    navigator.clipboard
      .writeText(banglaLang.text)
      .then(() => {
        setCopy("Copied!");
        setTimeout(function () {
          setCopy("Copy Ayah");
        }, 3000);
      })
  };

  return (

    <main>
            <Helmet>
        <title>{englishName} | Al-Quran Bangla</title>
        <link rel="canonical" href={`https://alquran-bangla.netlify.app/ayah/${ayahNumber}`} />
      </Helmet>
        <div className={`bg-[#1C2733] px-10 py-10 mx-auto flex justify-center flex-col items-center gap-3 rounded-2xl w-[90%] mb-5 ${revelationType === "Meccan" ? "bg-[url('https://i.ibb.co/f9szXvM/makkah-dark.png')]" : "bg-[url('https://i.ibb.co/p3ncHhy/madinah-dark.png')]"} bg-no-repeat bg-left bg-contain`}>
        <h1 className='text-3xl font-noto-naskh-arabic text-white'>{banglaLang.surah.name}</h1>
        <div className='mb-3'>
          <h1 className='text-xl font-bold text-white'>{banglaLang.surah.englishName}</h1>
          <span className='font-normal text-sm text-[#80909f]'>({banglaLang.surah.englishNameTranslation})</span>
        </div>
        <div className='flex items-center gap-3'>
          <button className='bg-[#828282] px-2 h-8 w-20 flex items-center gap-1 bg-opacity-20 rounded-lg text-white text-xs'><LuBox className='text-lg text-white' />{banglaLang.surah.revelationType}</button>
          <GoDotFill className='text-white text-xs' />
          <button className='bg-[#828282] px-2 h-8 w-16 flex items-center justify-between gap-1 bg-opacity-20 rounded-lg text-white text-xs'><svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.1666 15.7619C8.79845 14.972 7.24646 14.5562 5.66663 14.5562C4.0868 14.5562 2.5348 14.972 1.16663 15.7619V2.76192C2.5348 1.97201 4.0868 1.55615 5.66663 1.55615C7.24646 1.55615 8.79845 1.97201 10.1666 2.76192M10.1666 15.7619C11.5348 14.972 13.0868 14.5562 14.6666 14.5562C16.2465 14.5562 17.7985 14.972 19.1666 15.7619V2.76192C17.7985 1.97201 16.2465 1.55615 14.6666 1.55615C13.0868 1.55615 11.5348 1.97201 10.1666 2.76192M10.1666 15.7619V2.76192" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> {banglaLang.surah.numberOfAyahs}</button>
<button onClick={()=>setSurahBookmarkToLocalStorage(number)}><FaBookmark className='text-[#32B7C5] focus:outline-none text-2xl' data-tooltip-id="bookmark"
            data-tooltip-content="Bookmark Surah"
            data-tooltip-place="top" /></button>

<button onClick={handleGoBack}><IoArrowBackCircle className='text-[#32B7C5] focus:outline-none text-3xl' data-tooltip-id="back"
            data-tooltip-content="Back To Surah"
            data-tooltip-place="top" /></button>
        </div>
      </div>
    <div className="bg-[#1C2733] px-10 py-10 mx-auto flex lg:flex-row flex-col gap-10 items-center justify-between rounded-2xl w-[90%] my-5">
      <div className=''>
        <h1 className=' text-sm lg:text-xl font-medium text-white mb-3 font-mukti' id='bangla'>{banglaLang.text}</h1>
        <span className='font-normal text-xs lg:text-sm text-[#80909f]'>{englishLang.text}</span>
        <div className='flex  items-center gap-5 mt-5'>
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
          <button onClick={()=>setAyahBookmarkToLocalStorage(number)}><FaBookmark className='text-[#32B7C5] focus:outline-none' data-tooltip-id="bookmark"
            data-tooltip-content="Bookmark Ayah"
            data-tooltip-place="top" /></button>
          <button onClick={copyCode}><IoCopy className='text-[#32B7C5] focus:outline-none' data-tooltip-id="copy"
            data-tooltip-content={copy}
            data-tooltip-place="top" /></button>
          <button>
            <FaBookOpen className='text-[#32B7C5] focus:outline-none' data-tooltip-id="tafsir"
              data-tooltip-content="Tafsir"
              data-tooltip-place="top" />
          </button>
          <button><FaShareAlt className='text-[#32B7C5] focus:outline-none' data-tooltip-id="share"
            data-tooltip-content="Share"
            data-tooltip-place="top" /></button>
        </div>
      </div>

      <div className='text-right flex gap-3'>
      <span className='text-2xl'>{arabicNumber}</span>
        <h1 className='lg:text-3xl text-2xl font-noto-naskh-arabic text-white'>{text}</h1>
      </div>

      {/* Render the audio element with the ref */}
      <audio ref={audioRef} src={audio} onEnded={handleAudioEnd} />

      {/* Render tooltips */}
      <Tooltip id="copy" />
      <Tooltip id="bookmark" />
      <Tooltip id="play" />
      <Tooltip id="tafsir" />
      <Tooltip id="share" />
      <Tooltip id="back" />
    </div>
    </main>
  );
}

export default Ayah;
