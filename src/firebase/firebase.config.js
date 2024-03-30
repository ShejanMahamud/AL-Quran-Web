// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7fRQgDr0tRrvyjC-n1ntrw-bqaUUdYFY",
  authDomain: "al-quran-web.firebaseapp.com",
  projectId: "al-quran-web",
  storageBucket: "al-quran-web.appspot.com",
  messagingSenderId: "526756770143",
  appId: "1:526756770143:web:3e02994f8930bdbdca46ea",
  measurementId: "G-MCBXBQ5Y5L"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;