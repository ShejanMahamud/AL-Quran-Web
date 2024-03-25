import React, { useRef, useState } from 'react';
import 'react-h5-audio-player/lib/styles.css';
import { FaBookOpen, FaBookmark, FaFacebookF, FaPause, FaPlay, FaShareAlt, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoCopy } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from 'react-tooltip';
import { getBookMarkAyahFromLocalStorage } from '../../Utils/localStorage';


const Ayahs = ({ arbiAyah, banglaAyah, englishAyah,surahNumber }) => {
const [modalText, setModalText] = useState(false)

  const { number, text, audio,numberInSurah } = arbiAyah;
  const [isLoading, setIsLoading] = useState(false);
  const arabicNumber = number.toLocaleString('ar-EG');
  // State to track whether audio is playing or not
  const [isPlaying, setIsPlaying] = useState(false);

  const navigate = useNavigate();

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

  const setAyahBookmarkToLocalStorage = (ayahId) => {
    let BookmarkAyahInLocalStorage = getBookMarkAyahFromLocalStorage();
    if(!BookmarkAyahInLocalStorage.includes(ayahId)){
        BookmarkAyahInLocalStorage.push(ayahId);
        const strBookmarkAyah = JSON.stringify(BookmarkAyahInLocalStorage);
        localStorage.setItem('ayah-id', strBookmarkAyah);
        toast.success('Ayah Saved!')
    }else{
        toast.error('Already Saved!')
    }
  }

  const copyCode = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopy("Copied!");
        setTimeout(function () {
          setCopy("Copy Ayah");
        }, 3000);
      })
  };

  const handleTafsir = () => {
    setIsLoading(true); // Show loader

    // Delay navigation by 2 seconds (2000 milliseconds)
    setTimeout(() => {
      setIsLoading(false); // Hide loader
      navigate(`/tafsir/${surahNumber}/${numberInSurah}`);
    }, 2000);
  };

  return (
    <div className="bg-[#1C2733] px-10 py-10 mx-auto flex lg:flex-row flex-col gap-10 items-center justify-between rounded-2xl w-[90%] my-5 relative">
      <div className=''>
                 
        <h1 className='text-base lg:text-xl font-medium text-white mb-3 font-mukti tracking-wider' id='bangla'>{banglaAyah.text}</h1>
        <span className='font-normal text-xs lg:text-sm text-[#80909f]'>{englishAyah.text}</span>
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
          <button onClick={()=>copyCode(banglaAyah.text)}><IoCopy className='text-[#32B7C5] focus:outline-none' data-tooltip-id="copy"
            data-tooltip-content={copy}
            data-tooltip-place="top" /></button>
          <button onClick={handleTafsir}>
            <FaBookOpen className='text-[#32B7C5] focus:outline-none' data-tooltip-id="tafsir"
              data-tooltip-content="Tafsir"
              data-tooltip-place="top" />
          </button>
          <button onClick={()=>setModalText(true)}><FaShareAlt className='text-[#32B7C5] focus:outline-none' data-tooltip-id="share"
            data-tooltip-content="Share"
            data-tooltip-place="top" /></button>
            
        </div>

{
  modalText && <div className='bg-transparent backdrop-blur-lg border border-white border-opacity-20 lg:h-[200px] h-auto absolute lg:w-[30%] w-[80%] mx-auto left-0 right-0 top-10 rounded-2xl px-5 py-5 duration-500 z-20'>
  <h1 className='text-white font-poppins text-lg mb-3'>Share With Social Media</h1>

  <div className='flex items-center gap-3'>
  <TwitterShareButton url={window.location.href}>
  <FaXTwitter className='text-[#32B7C5] text-2xl'/>
  </TwitterShareButton>

  <FacebookShareButton url={window.location.href}>
  <FaFacebookF  className='text-[#32B7C5] text-2xl'/>
  </FacebookShareButton>

  <TelegramShareButton url={window.location.href}>
  <FaTelegramPlane   className='text-[#32B7C5] text-2xl'/>
  </TelegramShareButton>

  <WhatsappShareButton url={window.location.href}>
  <FaWhatsapp  className='text-[#32B7C5] text-2xl'/>
  </WhatsappShareButton>
  </div>

  <div className='my-5 textarea textarea-info flex items-center w-full justify-between'>
<p>{`https://al-quran-web.netlify.app/ayah/${number}`}</p>
<button onClick={()=>copyCode(`https://al-quran-web.netlify.app/ayah/${number}`)} ><IoCopy className='text-[#32B7C5] text-xl' /></button>
</div>
  <button  className=" bg-[#32B7C5] text-white px-4 py-2 rounded-lg" onClick={()=>setModalText(false)}>Close</button>
  </div>

}

        
        {
          isLoading && <div className='w-full flex justify-center my-3'>
                    <span className="loading loading-spinner text-info loading-lg"></span>
           </div>
                }
      </div>

      <div className='lg:text-right flex gap-3 w-full lg:justify-end justify-center text-center'>
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
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default Ayahs;
