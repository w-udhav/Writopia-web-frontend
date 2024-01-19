import React, { useContext } from "react";
import logo from "../assets/svg/logo.svg";
import { logoutUser } from "../Utils/api/auth";
import { AuthContext } from "../extras/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { setUser, user, setBlogModal } = useContext(AuthContext);
  return (
    <div className="flex gap-2 max-w-[1920px] font-pop">
      <div className="rounded-xl py-2 w-full">
        <Link to="/" className="flex gap-1 items-center">
          <img src={logo} alt="logo" className="w-10" />
          <p className="text-2xl">Writopia</p>
        </Link>
      </div>
      <div className=" justify-center items-center flex gap-2">
        <button
          onClick={() => setBlogModal(true)}
          className="bg-black rounded-full text-white p-3 font-semibold text-sm w-full"
        >
          Add
        </button>
        <p className="text-[15px] rounded-full border p-3 uppercase font-semibold tracking-wide flex items-center gap-1 cursor-pointer">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          {user?.username}
        </p>

        <button
          onClick={() => {
            logoutUser(setUser);
            navigate("/");
          }}
          className="bg-black rounded-full text-white p-3 font-semibold text-sm w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
