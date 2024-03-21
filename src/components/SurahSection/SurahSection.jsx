import React, { useEffect, useState } from 'react';
import Surah from '../Surah/Surah';


const SurahSection = ({handleSurahClick}) => {

const [surahs, setSurahs] = useState([]);

useEffect(()=>{
    fetch('https://api.alquran.cloud/v1/meta')
    .then(res => res.json())
    .then(data => setSurahs(data.data.surahs.references));
},[])


  return (
    <main className='w-[90%] mx-auto '>

       <div className='w-full grid lg:grid-cols-3 grid-cols-1 row-auto items-center justify-between gap-6 mt-20'>
       {
        surahs.map(surah =><Surah key={surah.number} surah={surah} handleSurahClick={handleSurahClick}></Surah>)
       }
       </div>

    </main>
  )
}

export default SurahSection