import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getBookMarkSurahFromLocalStorage } from '../../Utils/localStorage';
import BookmarkAyah from '../BookmarkAyah/BookmarkAyah';
import BookmarkSurah from '../BookmarkSurah/BookmarkSurah';
import Surah from '../Surah/Surah';

const SurahSection = ({ handleSurahClick }) => {
    const [surahs, setSurahs] = useState([]);
    const [bookmarkedSurah, setBookmarkedSurah] = useState([]);
    const [bookmarkedAyah, setBookmarkedAyah] = useState([]);
    const [viewMode, setViewMode] = useState('Surah');

    useEffect(() => {
        fetch('https://api.alquran.cloud/v1/meta')
            .then(res => res.json())
            .then(data => setSurahs(data.data.surahs.references));
    }, []);

    useEffect(() => {
        const bookmarkedSurahLS = getBookMarkSurahFromLocalStorage();
        const bookmarkedSurahObjects = bookmarkedSurahLS
            .map(surahId => surahs.find(surah => surah.number === surahId))
            .filter(Boolean);
        setBookmarkedSurah(bookmarkedSurahObjects);
    }, [surahs]);

    const updateBookmarkedAyah = () => {
        const bookmarkedAyahLS = getBookMarkSurahFromLocalStorage();

        const fetchPromises = bookmarkedAyahLS.map(ayahId => {
            return fetch(`https://api.alquran.cloud/v1/ayah/${ayahId}/editions/en.asad,bn.bengali,ar.alafasy`)
                .then(res => res.json())
                .then(data => data.data);
        });

        Promise.all(fetchPromises)
            .then(bookmarkedAyahs => {
                setBookmarkedAyah(bookmarkedAyahs.slice(0, 1)); // Show only one bookmarked Ayah by default
            });
    };

    const updateBookmarkedSurah = () => {
        const bookmarkedSurahLS = getBookMarkSurahFromLocalStorage();
        const bookmarkedSurahObjects = bookmarkedSurahLS
            .map(surahId => surahs.find(surah => surah.number === surahId))
            .filter(Boolean);
        setBookmarkedSurah(bookmarkedSurahObjects);
        setViewMode('Surah'); // Set view mode to Surah when updating bookmarked Surah
    };

    useEffect(() => {
        if (viewMode === 'Ayah') {
            updateBookmarkedAyah();
        } else {
            updateBookmarkedSurah();
        }
    }, [viewMode]);

    return (
        <main className='w-[90%] mx-auto'>
            <div className='group'>
                <div className='mb-5'>
                    <button onClick={() => setViewMode('Ayah')} className='focus:bg-[#32B7C5] border border-[#32B7C5] text-white px-4 py-2 rounded-lg text-xs font-medium mr-5'>BookMarked Ayats</button>
                    <button onClick={() => setViewMode('Surah')} className='focus:bg-[#32B7C5] border border-[#32B7C5] text-white px-4 py-2 rounded-lg text-xs font-medium mr-5'>BookMarked Surah</button>
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

            <div className='w-full grid lg:grid-cols-3 grid-cols-1 row-auto items-center justify-between gap-6 mt-20'>
                {surahs.map(surah => <Surah key={surah.number} surah={surah} handleSurahClick={handleSurahClick}></Surah>)}
            </div>
        </main>
  )
}

export default SurahSection