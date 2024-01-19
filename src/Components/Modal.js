import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Modal({ modalData, setModalData }) {
  const typeClass = {
    SUCCESS: "bg-green-400",
    ERROR: "bg-red-400",
    WARNING: "bg-yellow-400",
  };

  useEffect(() => {
    if (modalData.type) {
      setTimeout(() => {
        setModalData({
          type: "",
          msg: "",
        });
      }, 6000);
    }
  }, [modalData]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-2 right-2 rounded-lg p-2 px-3 font-medium text-[15px] ${
          typeClass[modalData?.type] || "bg-zinc-400"
        }`}
      >
        {modalData.msg || null}
      </motion.div>
    </AnimatePresence>
  );
}
