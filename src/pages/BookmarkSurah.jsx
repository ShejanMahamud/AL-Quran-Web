import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoBookmarkSlashFill } from "react-icons/go";
import useAuth from "../hooks/useAuth";

const BookmarkSurah = () => {
  const [surahs, setSurahs] = useState([]);
  const { user } = useAuth() || {};

  useEffect(() => {
    axios
      .get(`http://localhost:5947/bookmark_surah/${user?.email}`)
      .then((res) => {
        setSurahs(res.data);
      })
      .catch((error) => toast.error("Something went wrong!"));
  }, [user]);

  return (
    <div className="py-28 w-full min-h-screen flex items-center justify-center font-poppins">
      {surahs.length === 0 ? (
        <div className="flex flex-col items-center">
            <GoBookmarkSlashFill className="text-9xl text-[#1daeff]"/>
            <span className="text-white text-2xl my-2">No Bookmarked Surah Found!</span>
        </div>
      ) : (
        <p>suRAH Found!</p>
      )}
    </div>
  );
};

export default BookmarkSurah;
