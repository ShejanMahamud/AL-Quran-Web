import axios from "axios";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Ayah from "./components/Ayah/Ayah";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import SurahDetails from "./components/SurahDetails/SurahDetails";
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
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
        errorElement: <ErrorPage></ErrorPage>
      },
      {
        path: '/ayah/:ayahNumber',
        loader: ({params}) => axios.get(`https://api.alquran.cloud/v1/ayah/${params.ayahNumber}/editions/en.asad,bn.bengali,ar.alafasy`),
        element: <Ayah></Ayah>,
        errorElement: <ErrorPage></ErrorPage>
      }
    ],
    errorElement: <ErrorPage></ErrorPage>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
