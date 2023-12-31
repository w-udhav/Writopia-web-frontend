import React from "react";
import bg from "../assets/backgrounds/auth.svg";
const { useLocation } = require("react-router-dom");

export default function AuthTemp({ children }) {
  const location = useLocation();
  const route = location.pathname.split("/");

  return (
    <div className="w-full h-screen flex justify-center items-center p-3 font-roboto">
      <div className="max-w-[27rem] w-full rounded-xl shadow-lg bg-white border border-zinc-200 overflow-hidden">
        <div className="p-4">
          {/* <img src="" alt="" /> */}
          <h1 className="text-center font-pop font-bold text-3xl">
            {route.includes("signup") && "Create Account"}
            {route.includes("login") && "Login"}
            {route.includes("forgot-password") && "Forgot Password"}
            {route.includes("reset-password") && "Reset Password"}
          </h1>
        </div>
        <div className="bg-zinc-100 w-full">{children}</div>
      </div>

      {/* Backgroud Stuff */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <img src={bg} alt="background" className="object-cover w-full h-full" />
      </div>
    </div>
  );
}
