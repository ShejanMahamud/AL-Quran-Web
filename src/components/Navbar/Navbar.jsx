import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

const [theme, setTheme] = useState('dark');

const handleThemeSwitch = (e) => {
  if(e.target.checked){
    setTheme('light')
  }else{
    setTheme('dark')
  }
}

const navigate = useNavigate();

const handleNavigate = () => {
  navigate(`/`)
}

// useEffect(()=>{
//   localStorage.setItem('theme',theme);
//   const savedTheme = localStorage.getItem('theme');
//   document.querySelector('html').setAttribute('data-theme',savedTheme);
// },[theme])

  return (
    <div>
      <nav className={`w-full mx-auto shadow-2xl lg:py-2 py-3 font-k2d flex items-center justify-between px-5 lg:px-20 fixed top-0 backdrop-blur-lg z-50 border-b border-b-white border-opacity-10`}>
        <div onClick={handleNavigate} className='flex items-center gap-2'>
            <div className='bg-[#32B7C5] lg:h-14 h-10 lg:w-14 w-10 lg:rounded-xl rounded-md flex items-center justify-center'>
            <img src="https://i.ibb.co/Kr4HN1m/quran.png" alt="quran.png" className='lg:w-8 w-6'/>
            </div>
            <div className='flex flex-col items-start'>
            <span className={`lg:text-2xl text-lg font-mukti`}>আল কুরআন</span>
            <span className='text-xs font-mukti'>কুরআন বাংলা</span>
            </div>
        </div>
        {/* <ul>
          <NavLink to="/"><li>Home</li></NavLink>
        </ul> */}
        <label class="flex cursor-pointer gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
  <input type="checkbox" class="toggle theme-controller z-50 tooltip" data-tip="Light Mode Soon.."/>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
</label>
    </nav>
    {/* <nav className={`w-full mx-auto shadow-2xl py-3 font-k2d flex items-center justify-between px-5 lg:px-20 fixed bottom-0 backdrop-blur-2xl z-50`}>
        <div className='flex items-center gap-2'>
        <GoHomeFill className='text-[#32B7C5] text-3xl'/>
        </div>
    </nav> */}
    </div>
  )
}

export default Navbar