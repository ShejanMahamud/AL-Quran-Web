import React, { useContext, useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { QuranContext } from './Dashboard';

const DashboardHome = () => {



const {bookmarkSurahs,ayahs} = useContext(QuranContext)

    useEffect(()=>{
        
    },[])

    const data = bookmarkSurahs;
    const data2 = ayahs;
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];


    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
      };
      
      const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };

  return (
   <main className='w-full'>
    <div className='grid grid-cols-3 items-center gap-5 w-[90%] mx-auto my-10'>
        <div className="w-full bg-[url('arabic.svg')] bg-[#121C26] bg-no-repeat bg-cover bg-center border-4 border-white border-opacity-5 rounded-xl px-5 py-5 shadow-2xl text-center">
            <h1 className='text-lg font-medium'>Bookmarked Surah</h1>
            <span className='text-5xl'>{bookmarkSurahs.length}</span>
        </div>
        <div className="w-full bg-[url('arabic.svg')] bg-[#121C26] bg-no-repeat bg-cover bg-center border-4 border-white border-opacity-5 rounded-xl px-5 py-5 shadow-2xl text-center">
            <h1 className='text-lg font-medium'>Bookmarked Ayah</h1>
            <span className='text-5xl'>{ayahs.length}</span>
        </div>
        <div className="w-full bg-[url('arabic.svg')] bg-[#121C26] bg-no-repeat bg-cover bg-center border-4 border-white border-opacity-5 rounded-xl px-5 py-5 shadow-2xl text-center">
            <h1 className='text-lg font-medium'>Bookmarked Tafsir</h1>
            <span className='text-5xl'>3</span>
        </div>
    </div>
     <div className='w-full grid lg:grid-cols-2 grid-cols-1 row-auto items-center gap-2 justify-center min-h-screen'>
        <div className='w-full flex flex-col items-center justify-center h-full'>
            <h1>Bookmarked Surah</h1>
           
        <ResponsiveContainer width="100%" height="50%">
        <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="englishName" />
      <YAxis />
      <Legend/>
      <Tooltip/>
      <Bar dataKey="numberOfAyahs" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
        </ResponsiveContainer>

        </div>

        <div className='w-full flex flex-col items-center justify-center h-full'>
            <h1>Bookmarked Ayahs</h1>
           
<ResponsiveContainer width="100%" height="50%">
<BarChart
      width={500}
      height={300}
      data={data2}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="surah.englishName" />
      <YAxis />
      <Legend/>
      <Tooltip/>
      <Bar dataKey="numberInSurah" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
</ResponsiveContainer>

        </div>
    </div>
   </main>
  )
}



export default DashboardHome