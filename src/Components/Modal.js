import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AuthContext } from "../extras/AuthContext";

export default function Modal() {
  const { modalData } = useContext(AuthContext);
  const typeClass = {
    SUCCESS: "bg-green-400",
    ERROR: "bg-red-400",
    WARNING: "bg-yellow-400",
  };
  const data = (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.3 }}
      className={`fixed bottom-2 right-2 rounded-lg p-2 text-[15px] ${
        typeClass[modalData?.type] || "bg-zinc-400"
      }`}
    >
      {modalData.msg || null}
    </motion.div>
  );
  const [modal, setModal] = useState(data);

  setTimeout(() => {
    setModal(null);
  }, 5000);

  return <AnimatePresence>{modal && modal}</AnimatePresence>;
}
