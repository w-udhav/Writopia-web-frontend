import React from "react";
import logo from "../assets/svg/logo.svg";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
export default function Footer() {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div className="w-full border-t bg-zinc-50 mt-24">
      <div className="max-w-[80rem] w-full mx-auto py-20 flex justify-between">
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="inline-block relative"
        >
          <img src={logo} className="w-11 h-11" alt="logo" />
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ width: 0 }}
                transition={{ duration: 0.3, type: "tween" }}
                className="w-full h-[4px] absolute -bottom-2 left-0 bg-amber-300"
              ></motion.div>
            )}
          </AnimatePresence>
        </Link>
        <div className="font-pop">
          <p>Udhav Wadhawan</p>
        </div>
      </div>
    </div>
  );
}
