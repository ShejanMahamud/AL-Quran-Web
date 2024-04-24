import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {

  const navigate = useNavigate();

  return (
    <div className='w-full min-h-screen flex flex-col items-center font-dmsans'>
      <Helmet>
      <title>404 | Not Found</title>
        <link rel="canonical" href="https://alquran-bangla.netlify.app/" />
      </Helmet>
        <div>
        <img src="https://i.ibb.co/tKTsCjR/404-1.png" alt="404.png" className=''/>
        </div>
        <div className='flex flex-col items-center w-full'>
            <h1 className='text-gray-800 font-bold text-xl tracking-wider text-center'>OPPS! PAGE NOT FOUND</h1>
            <button onClick={()=>navigate('/')} className='uppercase font-bold bg-[#1daeff] text-white px-6 py-2 rounded-full my-3'>
                Back To Home
            </button>
        </div>
    </div>
  )
}

export default ErrorPage