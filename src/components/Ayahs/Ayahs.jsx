import React, { useRef, useState } from 'react';
import 'react-h5-audio-player/lib/styles.css';
import { FaBookOpen, FaBookmark, FaPause, FaPlay, FaShareAlt } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { Tooltip } from 'react-tooltip';


const Ayahs = ({ arbiAyah, banglaAyah, englishAyah }) => {
  const { number, text, audio } = arbiAyah;
  const arabicNumber = number.toLocaleString('ar-EG');
  // State to track whether audio is playing or not
  const [isPlaying, setIsPlaying] = useState(false);
  const [copy, setCopy] = useState("Copy Ayah");

  // Ref to access the audio element
  const audioRef = useRef(null);

  const handleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    // Toggle the playback state
    setIsPlaying(!isPlaying);
  };

  // Function to handle audio end
  const handleAudioEnd = () => {
    setIsPlaying(false); // Set isPlaying to false when audio ends
  };



  const copyCode = () => {
    navigator.clipboard
      .writeText(banglaAyah.text)
      .then(() => {
        setCopy("Copied!");
        setTimeout(function () {
          setCopy("Copy Ayah");
        }, 3000);
      })
  };

  return (
    <div className="bg-[#1C2733] px-10 py-10 mx-auto flex gap-10 items-center justify-between rounded-2xl w-[90%] my-5">
      <div className=''>
        <h1 className='text-xl font-bold text-white mb-3' id='bangla'>{banglaAyah.text}</h1>
        <span className='font-normal text-sm text-[#80909f]'>{englishAyah.text}</span>
        <div className='flex  items-center gap-5 mt-5'>
          <button onClick={handleAudio}>
            {/* Use conditional rendering to toggle play/pause icon based on playback state */}
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
          <button><FaBookmark className='text-[#32B7C5] focus:outline-none' data-tooltip-id="bookmark"
            data-tooltip-content="Bookmark"
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
        <h1 className='text-3xl font-noto-naskh-arabic text-white'>{text}</h1>
      </div>

      {/* Render the audio element with the ref */}
      <audio ref={audioRef} src={audio} onEnded={handleAudioEnd} />

      {/* Render tooltips */}
      <Tooltip id="copy" />
      <Tooltip id="bookmark" />
      <Tooltip id="play" />
      <Tooltip id="tafsir" />
      <Tooltip id="share" />
    </div>
  );
}

export default Ayahs;
