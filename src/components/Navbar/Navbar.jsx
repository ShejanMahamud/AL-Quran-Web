import React, { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "../../Utils/LoadingCompo";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Navbar = () => {
  const { userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/`);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <nav
          className={`w-full mx-auto shadow-2xl lg:py-2 py-3 font-k2d flex items-center justify-between px-5 lg:px-20 fixed top-0 backdrop-blur-lg z-50 border-b border-b-white border-opacity-10`}
        >
          <div onClick={handleNavigate} className="flex items-center gap-2">
            <div className="bg-[#32B7C5] lg:h-14 h-10 lg:w-14 w-10 lg:rounded-xl rounded-md flex items-center justify-center">
              <img
                src="https://i.ibb.co/Kr4HN1m/quran.png"
                alt="quran.png"
                className="lg:w-8 w-6"
              />
            </div>
            <div className="flex flex-col items-start text-white">
              <span className={`lg:text-2xl text-lg font-mukti`}>আল কুরআন</span>
              <span className="text-xs font-mukti">কুরআন বাংলা</span>
            </div>
          </div>
          {userInfo ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      navigate("/user/dashboard");
                    }, 2000);
                  }}
                  className="w-10 rounded-full"
                >
                  <img alt="" src={userInfo?.photoURL || "user.png"} />
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/user/login")}
              className="bg-[#32B7C5] px-4 py-2 rounded-lg text-white flex items-center gap-2"
            >
              <FaUser /> Login
            </button>
          )}
        </nav>
      )}
    </div>
  );
};

export default Navbar;
