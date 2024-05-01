import React from "react";
import { Link } from "react-router-dom";

//import { useSelector } from "react-redux";
import Logo from "./../assest/Logo.png"


const HeaderAdmin = () => {

  return (
    <header className=" shadow-md w-full h-20 px-2 md:px-4 z-50 bg-blue-gray-900">

      <div className="flex items-center  h-full justify-between ">
        <Link to={"home"}>
          <div className=" ml-10 h-10 ">
            <img src={Logo} className="h-full " alt="Logo" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7 mr-10 ">

          <nav className="font-bold text-lg italic text-orange-600">
          Welcome
          </nav>

        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
