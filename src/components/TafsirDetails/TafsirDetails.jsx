import { default as React, useRef, useState } from 'react';
import 'react-h5-audio-player/lib/styles.css';
import { FaBookmark, FaPause, FaPlay, FaShareAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoArrowBackCircle, IoCopy } from "react-icons/io5";
import { LuBox } from "react-icons/lu";
import { useLoaderData, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from 'react-tooltip';

const TafsirDetails = () => {

    const navigate = useNavigate();

    const [copy, setCopy] = useState("Copy Ayah");

    const [isPlaying, setIsPlaying] = useState(null);

    const audioRef = useRef(null);

    const data = useLoaderData();

    const surahDetails = data.surah.data;

    const {name, englishName, englishNameTranslation, number, numberOfAyahs, revelationType} = surahDetails;

    const audioFile = data.audio.audio_file.audio_url;

    const tafsirDetails = data.tafsir.text;

    const handleGoBack = () => {
        navigate(`/surah/${number}`)
      }

      const handleAudio = () => {
        // Toggle playback state directly
        setIsPlaying(prevIsPlaying => !prevIsPlaying);
      
        // If audioRef.current exists, play or pause the audio accordingly
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
        setIsPlaying(false); // Set isPlaying to false when audio ends
      }

      const copyCode = () => {
        navigator.clipboard
          .writeText(tafsirDetails)
          .then(() => {
            setCopy("Copied!");
            setTimeout(function () {
              setCopy("Copy Ayah");
            }, 3000);
          })
      };

  return (
      <div className='w-full grid grid-cols-1 row-auto items-start -mt-5'>
      <div className={`bg-[#1C2733] px-10 py-10 mx-auto flex justify-center flex-col items-center gap-3 rounded-2xl w-[90%] mb-5 ${revelationType === "Meccan" ? "bg-[url('https://i.ibb.co/f9szXvM/makkah-dark.png')]" : "bg-[url('https://i.ibb.co/p3ncHhy/madinah-dark.png')]"} bg-no-repeat bg-left bg-contain`}>
        <h1 className='text-3xl font-noto-naskh-arabic text-white'>{name}</h1>
        <div className='mb-3 text-center'>
          <h1 className='text-xl font-bold text-white'>{englishName}</h1>
          <span className='font-normal text-sm text-[#80909f]'>({englishNameTranslation})</span>
        </div>
        <div className='flex items-center gap-3'>
          <button className='bg-[#828282] px-2 h-8 w-20 flex items-center gap-1 bg-opacity-20 rounded-lg text-white text-xs'><LuBox className='text-lg text-white' />{revelationType}</button>
          <GoDotFill className='text-white text-xs' />
          <button className='bg-[#828282] px-2 h-8 w-16 flex items-center justify-between gap-1 bg-opacity-20 rounded-lg text-white text-xs'><svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.1666 15.7619C8.79845 14.972 7.24646 14.5562 5.66663 14.5562C4.0868 14.5562 2.5348 14.972 1.16663 15.7619V2.76192C2.5348 1.97201 4.0868 1.55615 5.66663 1.55615C7.24646 1.55615 8.79845 1.97201 10.1666 2.76192M10.1666 15.7619C11.5348 14.972 13.0868 14.5562 14.6666 14.5562C16.2465 14.5562 17.7985 14.972 19.1666 15.7619V2.76192C17.7985 1.97201 16.2465 1.55615 14.6666 1.55615C13.0868 1.55615 11.5348 1.97201 10.1666 2.76192M10.1666 15.7619V2.76192" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> {numberOfAyahs}</button>
<button><FaBookmark className='text-[#32B7C5] focus:outline-none text-2xl' data-tooltip-id="bookmark"
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
      <div className="bg-[#1C2733] px-10 py-10 mx-auto flex lg:flex-row flex-col gap-10 items-center justify-between rounded-2xl w-[90%] my-5">
      <div className=''>
        <h1 className='text-sm lg:text-xl text-white mb-3 font-mukti' id='bangla'>{tafsirDetails}</h1>
       
        <div className='flex  items-center gap-5 mt-5'>
          <button><FaBookmark className='text-[#32B7C5] focus:outline-none' data-tooltip-id="bookmark"
            data-tooltip-content="Bookmark Ayah"
            data-tooltip-place="top" /></button>
          <button onClick={copyCode}><IoCopy className='text-[#32B7C5] focus:outline-none' data-tooltip-id="copy"
            data-tooltip-content={copy}
            data-tooltip-place="top" /></button>
          <button><FaShareAlt className='text-[#32B7C5] focus:outline-none' data-tooltip-id="share"
            data-tooltip-content="Share"
            data-tooltip-place="top" /></button>
        </div>
      </div>

      <div className='text-right flex gap-3'>
      {/* <span className='text-2xl'>{arabicNumber}</span> */}
        {/* <h1 className='lg:text-3xl text-2xl font-noto-naskh-arabic text-white'>{text}</h1> */}
      </div>

      {/* Render the audio element with the ref */}
      <audio ref={audioRef} src={audioFile} onEnded={handleAudioEnd} />

      {/* Render tooltips */}
      <Tooltip id="copy" />
      <Tooltip id="bookmark" />
      <Tooltip id="play" />
      <Tooltip id="tafsir" />
      <Tooltip id="share" />
      <Tooltip id="back" />
    </div>
      </div>
  )
}

export default TafsirDetails