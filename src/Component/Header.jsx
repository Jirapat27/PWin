import React, { useState } from "react";
import logo192 from "../../public/logo192.png";
import { Link, redirect, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BiSearch, BiAddToQueue } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const LayoutAdmin = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user);
  console.log("userData form admin layout", userData);

  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = () => {
    dispatch(logoutRedux());

    // dispatch(logoutRedux());
    navigate("/");

    toast("Logout sucesesfully");
    // return <Link to="" />
  };
  const handleLogin = () => {
    navigate("/login");
    // dispatch(logoutRedux());
    //return <Link to="/login" />;
    //navigator("/login")
    // redirect("../page/Login.js")
    //toast("Logout sucesesfully");

    // return <Link to="/login" />
  };
  return (
    <header className="fixed shadow-md w-full h-20 px-2 md:px-4 z-50 bg-white">
      {/* desktop*/}

      <div className="flex items-center  h-full justify-between ">
        <Link to={"adminpage"}>
          <div className="h-12 ">
            <img src={logo192} className="h-full " />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7 mr-10 ">
          <nav className="flex gap-4 md:gap-7 text-base md:text-lg">
            <Link to={"user"}>User</Link>
          </nav>
          <nav className="flex gap-4 md:gap-7 text-base md:text-lg">
            <Link to={"comments"}>Comments</Link>
          </nav>

          <div className=" text-red-800" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-7 h-7 rounded-full overflow-hidden drop-shadow-sm">
              {/* {userData.image ? (
                <img src={userData.image} className="w-full h-full " />
              ) : (
                <FaUserAlt />
              )}
              {userData && <span>{userData.username} </span>} */}
            </div>

            {showMenu &&
              ((<Link to={"win"}>Win</Link>),
              (<Link to={"user"}>User</Link>),
              (<Link to={"comments"}>comments</Link>),
              (
                <Link
                  to="/login"
                  className="whitespace-nowrap text-white px-3 py-1 m-1 rounded-full bg-blue-800"
                >
                  Login
                </Link>
              ),
              (
                <div className="absolute right-7 bg-white py-3 px-3 mt-6 shadow drop-shadow-md flex flex-col">
                  {userData.username ? (
                    <p
                      className="cursor-pointer text-white px-3 py-2 m-1 rounded-full bg-red-800 "
                      onClick={handleLogout}
                    >
                      {" "}
                      Logout{" "}
                    </p>
                  ) : (
                    <p
                      className="whitespace-nowrap text-white px-3 py-1 m-1 rounded-full bg-blue-800 cursor-pointer"
                      onClick={handleLogin}
                    >
                      Login
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* mobile*/}
    </header>
  );
};

export default LayoutAdmin;
