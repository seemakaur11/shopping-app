import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { MdLogout,MdLogin  } from "react-icons/md";
import { logout } from "../redux/slices/authSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
};
  return (
    <>
      <div className="w-full h-[75px] sticky top-0 bg-white shadow-md z-50 px-24">
        <div className="w-full h-full flex justify-between items-center">
          <a href="/" className="text-red-600 text-lg font-medium">
            Shop Now
          </a>
          <div className="lg:hidden absolute flex" style={{ right: "0" }}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
            >
              <svg
                className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "bloc"}`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
              <svg
                className={`fill-current h-3 w-3 ${
                  isOpen ? "block" : "hidden"
                }`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isOpen ? "block bg-white absolute right-0 top-14 px-2" : "hidden"
            } lg:inline-flex`}
          >
            <ul className="flex gap-12 text-sm font-normal">
              <li  className="py-2">
                <a
                  href="/"
                  className={`flex text-xl font-medium text-slate-900`}
                  onClick={() => setIsOpen(false)} // Close menu on link click
                >
                  Home{" "}
                </a>
              </li>
              <li className="pt-3"><FaShoppingCart className="text-xl"/></li>
              {user ? (
                <>
                <li className="pt-2">
                   <span className="bg-red-500 rounded-full w-[30px] h-[30px] pt-[3px] inline-block
                    text-center font-normal text-base text-white">{user.name ? user.name?.charAt(0).toUpperCase() : <MdLogin/>}</span>
                </li>
                 <li className="pt-3">
                 <MdLogout className="text-xl cursor-pointer" onClick={handleLogout}/>
             </li>
                </>
                
              ) : <>
              <li  className="pt-3">
              <Link to="/login">
                <FaUser className="text-xl"/>
                </Link>
              </li>
              </>}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
