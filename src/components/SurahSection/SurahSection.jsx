import React, { useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import 'swiper/css';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getBookMarkAyahFromLocalStorage, getBookMarkSurahFromLocalStorage } from '../../Utils/localStorage';
import BookmarkAyah from '../BookmarkAyah/BookmarkAyah';
import BookmarkSurah from '../BookmarkSurah/BookmarkSurah';
import Surah from '../Surah/Surah';

const SurahSection = ({ handleSurahClick }) => {
    const [loading, setLoading] = useState(true)
    const [surahs, setSurahs] = useState([]);
    const [bookmarkedSurah, setBookmarkedSurah] = useState([]);
    const [bookmarkedAyah, setBookmarkedAyah] = useState([]);
    const [viewMode, setViewMode] = useState('Surah');

    useEffect(() => {
        fetch('Surah.json')
            .then(res => res.json())
            .then(data => {
                setTimeout(() => {
                    setSurahs(data);
                    setLoading(false);
                }, 2000);
            });
    }, []);


    useEffect(() => {
        const bookmarkedSurahLS = getBookMarkSurahFromLocalStorage();
        if(bookmarkedSurahLS.length !== 0){
            const bookmarkedSurahObjects = bookmarkedSurahLS
            .map(surahId => surahs.find(surah => surah.number === surahId))
            .filter(Boolean);
        setBookmarkedSurah(bookmarkedSurahObjects);
        }
    });

    useEffect(() => {
        const updateBookmarkedAyah = async () => {
            const bookmarkedAyahLS = getBookMarkAyahFromLocalStorage();
            
            const fetchPromises = bookmarkedAyahLS.map(async ayahId => {
                const response = await fetch(`https://api.alquran.cloud/v1/ayah/${ayahId}/editions/en.asad,bn.bengali,ar.alafasy`);
                const data = await response.json();
                return data.data;
            });
            
            const bookmarkedAyahs = await Promise.all(fetchPromises);
            setBookmarkedAyah(bookmarkedAyahs);
        };
    
        if (viewMode === 'Ayah') {
            updateBookmarkedAyah();
        }else {
            updateBookmarkedSurah();
        }
    },[viewMode]); // Adding viewMode as dependency to trigger effect when viewMode changes
    

    const updateBookmarkedSurah = () => {
        const bookmarkedSurahLS = getBookMarkSurahFromLocalStorage();
        if(bookmarkedSurahLS.length !== 0){
            const bookmarkedSurahObjects = bookmarkedSurahLS
            .map(surahId => surahs.find(surah => surah.number === surahId))
            .filter(Boolean);
        setBookmarkedSurah(bookmarkedSurahObjects);
        setViewMode('Surah');
        } 
    };

    return (
        <main className='w-[90%] mx-auto pb-20'>
            
            <div className='group'>
                <div className='my-5'>
                    <button onClick={() => setViewMode('Ayah')} className={`focus:bg-[#32B7C5] border border-[#32B7C5] text-white px-4 py-2 rounded-lg text-xs font-medium mr-5 `}>BookMarked Ayats</button>
                    <button onClick={() => setViewMode('Surah')} className={`focus:bg-[#32B7C5] border border-[#32B7C5] text-white px-4 py-2 rounded-lg text-xs font-medium mr-5`}>BookMarked Surah</button>
                </div>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={50}
                    navigation={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                >
                    <div className='grid grid-cols-3 grid-rows-1 items-center gap-5'>
                        
                        {viewMode === 'Surah' &&
                            bookmarkedSurah.length !== 0 && bookmarkedSurah.map(surah => <SwiperSlide><BookmarkSurah key={surah.number} surah={surah}></BookmarkSurah></SwiperSlide>)
                        }

                        {viewMode === 'Ayah' &&
                            bookmarkedAyah.length !== 0 && bookmarkedAyah.map(ayah => <SwiperSlide><BookmarkAyah ayah={ayah}></BookmarkAyah></SwiperSlide>)
                        }


                    </div>
                </Swiper>
            </div>

            <hr className='border border-gray-700 w-[90%] mx-auto my-10' />
            {
                    loading && <div className='w-full flex justify-center my-3'>
                    <span className="loading loading-spinner text-info loading-lg"></span>
                    </div>
                }
            <div className='w-full grid lg:grid-cols-3 grid-cols-1 row-auto items-center justify-between gap-6 mt-20'>
             
                {surahs.map(surah => <Surah key={surah.number} surah={surah} handleSurahClick={handleSurahClick}></Surah>)}
            </div>
        </main>
  )
}

export default SurahSection