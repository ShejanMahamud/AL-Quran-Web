import axios from "axios";
import React from 'react';
import * as ReactDOM from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Ayah from "./components/Ayah";
import './index.css';
import BookmarkSurah from "./pages/BookmarkSurah";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PhoneVerification from "./pages/PhoneVerification";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import SurahDetails from "./pages/SurahDetails";
import TafsirDetails from "./pages/TafsirDetails";
import PrivateRoute from './private/PrivateRoute';
import AuthProvider from "./providers/AuthProvider";
import Root from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home/>
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
            path: '/user/profile',
            element: <PrivateRoute><Profile></Profile></PrivateRoute>
          },
          {
            path: '/user/bookmark_surah',
            element: <PrivateRoute><BookmarkSurah></BookmarkSurah></PrivateRoute>
          }
    ],
    errorElement: <ErrorPage></ErrorPage>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
