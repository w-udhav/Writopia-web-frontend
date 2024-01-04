import React from "react";
import { motion } from "framer-motion";
import bg from "../assets/backgrounds/auth.svg";
import logo from "../assets/svg/logo.svg";
const { useLocation } = require("react-router-dom");

export default function AuthTemp({ children }) {
  const location = useLocation();
  const route = location.pathname.split("/");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, type: "tween" }}
      className="w-full min-h-screen flex justify-center items-center p-3 font-roboto"
    >
      <div className="max-w-[27rem] w-full rounded-xl shadow-lg bg-white border-2 border-zinc-200 overflow-hidden">
        <div className="p-4 py-5 flex flex-col items-center gap-3">
          <img src={logo} alt="logo" className="w-16" />
          <div className="text-center font-pop ">
            {route.includes("signup") && (
              <div className="flex flex-col gap-3">
                <h1 className="font-bold text-3xl">Create an account</h1>
                <p className="text-[14px] text-zinc-400 w-[80%] m-auto">
                  Sign up to create and explore your blogs
                </p>
              </div>
            )}
            {route.includes("login") && (
              <div className="flex flex-col gap-3">
                <h1 className="font-bold text-3xl">Login</h1>
                <p className="text-[14px] text-zinc-400 w-[80%] m-auto">
                  Login and explore your blogs
                </p>
              </div>
            )}
            {route.includes("forgot-password") && "Forgot Password"}
            {route.includes("reset-password") && "Reset Password"}
          </div>
        </div>
        <div className="bg-zinc-100 w-full">{children}</div>
      </div>

      {/* Backgroud Stuff */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <img src={bg} alt="background" className="object-cover w-full h-full" />
      </div>
    </motion.div>
  );
}
