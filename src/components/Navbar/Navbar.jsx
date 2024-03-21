import React, { useEffect, useState } from 'react';

const Navbar = () => {

const [theme, setTheme] = useState('dark');

const handleThemeSwitch = (e) => {
  if(e.target.checked){
    setTheme('light')
  }else{
    setTheme('dark')
  }
}

useEffect(()=>{
  localStorage.setItem('theme',theme);
  const savedTheme = localStorage.getItem('theme');
  document.querySelector('html').setAttribute('data-theme',savedTheme);
},[theme])

  return (
    <nav className={`w-full mx-auto shadow-2xl py-3 font-k2d flex items-center justify-between px-20`}>
        <div className='flex items-center gap-2'>
            <div className='bg-[#32B7C5] h-14 w-14 rounded-xl flex items-center justify-center'>
            <img src="https://i.ibb.co/Kr4HN1m/quran.png" alt="quran.png" className='w-8'/>
            </div>
            <div className='flex flex-col items-start'>
            <span className={`text-2xl`}>Al-Quran</span>
            <span className='text-xs '>Bangla Quran</span>
            </div>
        </div>
        <label class="flex cursor-pointer gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
  <input type="checkbox" class="toggle theme-controller" onChange={handleThemeSwitch}/>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
</label>
    </nav>
  )
}

export default Navbar