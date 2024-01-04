import React, { useContext } from "react";
import logo from "../assets/svg/logo.svg";
import { logoutUser } from "../Utils/api/auth";
import { AuthContext } from "../extras/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  return (
    <div className="flex gap-2 max-w-[1920px] font-pop">
      <div className="rounded-xl py-2 w-full">
        <Link to="/" className="flex gap-1 items-center">
          <img src={logo} alt="logo" className="w-10" />
          <p className="text-2xl">Writopia</p>
        </Link>
      </div>
      <div className=" justify-center items-center flex">
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
