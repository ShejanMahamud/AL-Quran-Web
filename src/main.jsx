import axios from "axios";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
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
        loader: ({params}) => axios.get(`https://api.alquran.cloud/v1/surah/${params.surahNumber}/editions/en.asad,bn.bengali,ar.alafasy`),
        element: <SurahDetails></SurahDetails>,
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
