import React, { useState } from "react";
import logo from "../assets/svg/logo-black.svg";
import create from "../assets/svg/new.svg";
import edit from "../assets/svg/edit.svg";
import category from "../assets/svg/category.svg";
import { Link, useLocation } from "react-router-dom";

export default function AdminTemp({ children }) {
  const location = useLocation();
  const route = location.pathname.split("/");

  const links = [
    {
      name: "Home",
      icon: logo,
      path: "/admin/dashboard",
    },
    {
      name: "New",
      icon: create,
      path: "/admin/create",
    },
    {
      name: "Categories",
      icon: category,
      path: "/admin/category",
    },
    {
      name: "Manage",
      icon: edit,
      path: "/admin/manage",
    },
  ];
  return (
    <div className="w-full h-screen flex ">
      {/* Left Panel */}
      <div className="w-[5.6rem] p-3 h-full bg-[#F3F6FC] flex flex-col items-center">
        {links.map((item, index) => {
          return (
            <Link
              to={item.path}
              key={index}
              className="flex flex-col  items-center rounded-md p-2 hover:text-black hover:font-medium transition-all"
            >
              <div
                className={`w-[3.5rem] h-[2rem] rounded-full flex justify-center items-center p-1 transition-all 
                ${
                  route.includes(item.path.split("/")[2])
                    ? "bg-sky-200"
                    : "hover:bg-zinc-200"
                }
              `}
              >
                <img src={item.icon} alt="logo" className="w-5 opacity-80" />
              </div>
              <h3 className={`font-pop text-[12px] text-zinc-800`}>
                {item.name}
              </h3>
            </Link>
          );
        })}
      </div>

      {/* Main Area */}
      <div className="p-3 flex flex-col gap-3 w-full">
        <h1 className="font-pop text-4xl font-medium capitalize">{route[2]}</h1>
        {children}
      </div>
    </div>
  );
}
