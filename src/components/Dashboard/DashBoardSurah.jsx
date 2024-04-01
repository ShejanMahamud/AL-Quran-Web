import React, { useContext } from 'react'
import BookmarkSurah from '../BookmarkSurah/BookmarkSurah'
import { QuranContext } from './Dashboard'

const DashBoardSurah = () => {

const {bookmarkSurahs} = useContext(QuranContext)


  return (
    <div className='w-[90%] mx-auto grid grid-cols-2 row-auto items-center gap-10 py-20'>
        {
            bookmarkSurahs.map(surah => <BookmarkSurah surah={surah}/>)
        }
    </div>
  )
}

export default DashBoardSurah