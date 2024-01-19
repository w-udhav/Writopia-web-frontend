import React, { useContext, useEffect, useState } from "react";
import Lottie from "lottie-react";
import loading from "../../assets/animations/loading.json";
import verified from "../../assets/animations/verified.json";
import verified2 from "../../assets/animations/verified2.json";

import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../Utils/api/axiosInstance";
import { AuthContext } from "../../extras/AuthContext";

export default function Verfiying() {
  const [verified, setVerified] = useState(false);

  const { setUser, setModalData } = useContext(AuthContext);

  const fetchStatus = async () => {
    try {
      const res = await axiosInstance.get("/user/me");
      if (res?.data?.isVerified) {
        setVerified(true);
      }
    } catch (error) {
      console.log(error);
      setModalData({
        type: "ERROR",
        msg: error.msg,
      });
    }
  };

  useEffect(() => {
    setInterval(() => {
      fetchStatus();
    }, 1000);
  }, [verified]);

  return (
    <div className="min-h-30 flex justify-center items-center py-3">
      <div className="flex flex-col items-center ">
        <AnimatePresence>
          {verified ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Lottie
                animationData={verified2}
                loop
                autoplay
                className="w-44 h-44"
                key="loading"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Lottie
                animationData={loading}
                loop
                autoplay
                className="w-44 h-44"
                key="loading"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <p className="font-bold text-xl text-zinc-500">
              {verified ? "Verified!" : "Verifying"}
            </p>
            {verified && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-amber-500 text-white px-3 py-1 rounded-xl mt-3"
              >
                <Link to="/">Continue</Link>
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
