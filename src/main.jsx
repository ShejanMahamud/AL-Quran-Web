import axios from "axios";
import React from 'react';
import * as ReactDOM from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Ayah from "./components/Ayah/Ayah";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PhoneVerification from "./components/PhoneVerification/PhoneVerification";
import Register from "./components/Register/Register";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import SurahDetails from "./components/SurahDetails/SurahDetails";
import SurahSection from './components/SurahSection/SurahSection';
import TafsirDetails from "./components/TafsirDetails/TafsirDetails";
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: '/',
        element: <SurahSection/>
      },
      {
        path: '/surah/:surahNumber',
        loader: async ({params}) => {
          try {
          const [surahDetails, surahAudio] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/surah/${params.surahNumber}/editions/en.asad,bn.bengali,ar.alafasy`),
          fetch(`https://api.quran.com/api/v4/chapter_recitations/7/${params.surahNumber}`)
          ]);
          const surahDetailsData = await surahDetails.json();
          const surahAudioData = await surahAudio.json();
          return { surah: surahDetailsData, audio: surahAudioData };
          } catch (error) {
          console.error('Error fetching combined data:', error);
          throw error;
          }
          },
          element: <SurahDetails></SurahDetails>,
      },
      {
        path: '/ayah/:ayahNumber',
        loader: ({params}) => axios.get(`https://api.alquran.cloud/v1/ayah/${params.ayahNumber}/editions/en.asad,bn.bengali,ar.alafasy`),
        element: <Ayah></Ayah>,
      },
      {
        path: '/tafsir/:surahNumber/:ayahNumber',
        loader: async ({params}) => {
          try {
          const [surahDetails, surahAudio, surahTafsir] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/surah/${params.surahNumber}/ar.alafasy`),
          fetch(`https://api.quran.com/api/v4/chapter_recitations/7/${params.surahNumber}`),
          fetch(`https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/bn-tafsir-abu-bakr-zakaria/${params.surahNumber}/${params.ayahNumber}.json`)
          ]);
          const surahDetailsData = await surahDetails.json();
          const surahAudioData = await surahAudio.json();
          const surahTafsirData = await surahTafsir.json();
          return { surah: surahDetailsData, audio: surahAudioData, tafsir: surahTafsirData };
          } catch (error) {
          console.error('Error fetching combined data:', error);
          throw error;
          }
          },
          element: <TafsirDetails></TafsirDetails>,
      },
          {
            path: '/user/login',
            element: <Login></Login>
          },
          {
            path: '/user/register',
            element: <Register/>
          },
          {
            path: '/user/reset-password',
            element: <ResetPassword/>
          },
          {
            path: '/user/phone-verification',
            element: <PhoneVerification/>
          },
          {
            path: '/user/dashboard',
            element: <PhoneVerification/>
          }
    ],
    errorElement: <ErrorPage></ErrorPage>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
    <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
