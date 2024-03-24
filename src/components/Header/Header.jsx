import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Header = () => {
const [searchText, setSearchText] = useState('');

    const getSearchText = (e) => {
        setSearchText(e.target.value)
    }

  return (
    <header className={`bg-[url('https://i.ibb.co/7p08xj3/image.webp')] w-full h-[450px] bg-no-repeat bg-cover bg-center py-40 *:mb-5`}>
        <div className='flex items-center gap-3 justify-center font-k2d'>
            <img src="https://i.ibb.co/HHPSKzM/logo.png" alt="logo.svg" className='w-20'/>
            <div className='flex items-start flex-col text-white'>
            <span className='font-semibold text-4xl font-mukti'>আল কুরআন</span>
            <span className='font-normal text-lg font-mukti'>কুরআন বাংলা</span>
            </div>
        </div>

        {/* <button onClick={isDarkMode} className='bg-white p-3'></button> */}

        <div className='flex items-center justify-between bg-[#28333F] rounded-lg w-[90%] lg:w-[40%] mx-auto px-5 py-3 shadow-lg'>
            <input type="text" className='bg-transparent focus:outline-none' placeholder='Search Surah Number' onChange={getSearchText}/>
            <Link to={`/surah/${searchText}`}><button><IoSearch /></button></Link>
        </div>

        {/* <div className='text-white font-poppins flex items-center gap-3 w-[80%] mx-auto justify-center'>
            <span className='font-bold '>Frequently Read: </span>
            <button className='bg-[#32B7C5] rounded-full px-6 py-3 font-semibold flex items-center justify-center text-xs'>Al-Kahfi</button>
            <button className='bg-[#32B7C5] rounded-full px-6 py-3 font-semibold flex items-center justify-center text-xs'>Al-Bakarah</button>
            <button className='bg-[#32B7C5] rounded-full px-6 py-3 font-semibold flex items-center justify-center text-xs'>Ar-Rahman</button>
            <button className='bg-[#32B7C5] rounded-full px-6 py-3 font-semibold flex items-center justify-center text-xs'>Ayat Qursi</button>
            <button className='bg-[#32B7C5] rounded-full px-6 py-3 font-semibold flex items-center justify-center text-xs'>Ali Imran</button>
        </div> */}


        {/* <div className='w-[80%] mx-auto font-poppins flex items-center gap-5 justify-center'>
            <button className={`bg-transparent rounded-2xl flex items-center text-base text-white gap-2 font-medium border border-white px-5 py-3`}>
            <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.83337 1.76172V19.7617M9.83337 5.76172H11.8334M9.83337 9.76172H11.8334M2.83337 1.76172H13.8334C14.3638 1.76172 14.8725 1.97243 15.2476 2.34751C15.6227 2.72258 15.8334 3.23129 15.8334 3.76172V15.7617C15.8334 16.2922 15.6227 16.8009 15.2476 17.1759C14.8725 17.551 14.3638 17.7617 13.8334 17.7617H2.83337C2.56816 17.7617 2.3138 17.6564 2.12627 17.4688C1.93873 17.2813 1.83337 17.0269 1.83337 16.7617V2.76172C1.83337 2.4965 1.93873 2.24215 2.12627 2.05461C2.3138 1.86708 2.56816 1.76172 2.83337 1.76172Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                <span>Juz</span>
            </button>
            <button className={`bg-transparent rounded-2xl flex items-center text-base text-white gap-2 font-medium border border-white px-5 py-3`}>
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3522 1.92399C10.4315 1.83691 10.5685 1.83691 10.6478 1.92399L12.2771 3.71227C12.3298 3.77003 12.4112 3.79186 12.4857 3.76815L14.7908 3.0341C14.9031 2.99836 15.0217 3.06687 15.0469 3.18194L15.5638 5.54529C15.5805 5.62163 15.6401 5.68125 15.7164 5.69794L18.0798 6.21482C18.1949 6.23998 18.2634 6.35865 18.2276 6.47089L17.4936 8.77605C17.4699 8.8505 17.4917 8.93195 17.5494 8.98457L19.3377 10.6139C19.4248 10.6932 19.4248 10.8302 19.3377 10.9096L17.5494 12.5389C17.4917 12.5915 17.4699 12.6729 17.4936 12.7474L18.2276 15.0526C18.2634 15.1648 18.1949 15.2835 18.0798 15.3086L15.7164 15.8255C15.6401 15.8422 15.5805 15.9018 15.5638 15.9781L15.0469 18.3415C15.0217 18.4566 14.9031 18.5251 14.7908 18.4893L12.4857 17.7553C12.4112 17.7316 12.3298 17.7534 12.2771 17.8112L10.6478 19.5995C10.5685 19.6865 10.4315 19.6865 10.3522 19.5995L8.72286 17.8112C8.67023 17.7534 8.58879 17.7316 8.51433 17.7553L6.20917 18.4893C6.09693 18.5251 5.97827 18.4566 5.9531 18.3415L5.43623 15.9781C5.41953 15.9018 5.35991 15.8422 5.28357 15.8255L2.92022 15.3086C2.80515 15.2835 2.73664 15.1648 2.77238 15.0526L3.50643 12.7474C3.53014 12.6729 3.50832 12.5915 3.45056 12.5389L1.66227 10.9096C1.5752 10.8302 1.5752 10.6932 1.66227 10.6139L3.45056 8.98457C3.50832 8.93195 3.53014 8.8505 3.50643 8.77605L2.77238 6.47089C2.73664 6.35865 2.80515 6.23998 2.92022 6.21482L5.28357 5.69794C5.35991 5.68125 5.41953 5.62163 5.43623 5.54529L5.9531 3.18194C5.97827 3.06687 6.09693 2.99836 6.20917 3.0341L8.51433 3.76815C8.58879 3.79186 8.67023 3.77003 8.72286 3.71227L10.3522 1.92399Z" stroke="#fff" stroke-width="2"/>
</svg>

                <span>Surah</span>
            </button>
            <button className={`bg-transparent rounded-2xl flex items-center text-base text-white gap-2 font-medium border border-white px-5 py-3`}>
            <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.1666 15.7619C8.79845 14.972 7.24646 14.5562 5.66663 14.5562C4.0868 14.5562 2.5348 14.972 1.16663 15.7619V2.76192C2.5348 1.97201 4.0868 1.55615 5.66663 1.55615C7.24646 1.55615 8.79845 1.97201 10.1666 2.76192M10.1666 15.7619C11.5348 14.972 13.0868 14.5562 14.6666 14.5562C16.2465 14.5562 17.7985 14.972 19.1666 15.7619V2.76192C17.7985 1.97201 16.2465 1.55615 14.6666 1.55615C13.0868 1.55615 11.5348 1.97201 10.1666 2.76192M10.1666 15.7619V2.76192" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                <span>Page</span>
            </button>
            <button className={`bg-transparent rounded-2xl flex items-center text-base text-white gap-2 font-medium border border-white px-6 py-3`}>
            <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5 1.40869H11.0294M1.5 7.76163H8.91177M1.5 14.1146H8.91177M13.1471 10.9381L16.3235 14.1146M16.3235 14.1146L19.5 10.9381M16.3235 14.1146V1.40869" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </button>
        </div> */}
    </header>
  )
}

export default Header