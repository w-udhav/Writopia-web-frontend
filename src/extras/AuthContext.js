import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../Utils/api/axiosInstance";
import SessionExpired from "../Components/Modal";
import Modal from "../Components/Modal";
import { useNavigate } from "react-router-dom";
import BlogModal from "../Components/BlogModal";
import { AnimatePresence } from "framer-motion";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [blogModal, setBlogModal] = useState(false); // [1
  const [modalData, setModalData] = useState({
    type: "",
    msg: "",
  });

  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const res = await axiosInstance.get("/user/me");
      setUser(res.data);
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 401) {
        // If the status code is 401
        setModalData({
          type: "ERROR",
          msg: "Session Expired. Please login again.",
        });
      } else {
        setModalData({
          type: "ERROR",
          msg: "Something went wrong. Please try again later.",
        });
      }
      localStorage.removeItem("accessToken"); // Remove the access token from the local storage
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getUserData();
      setInterval(() => {
        getUserData();
      }, 1000 * 60 * 5); // 5 minutes
    }
  }, []); // Empty dependency array

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        modalData,
        setModalData,
        setBlogModal,
      }}
    >
      {children}
      {modalData.type !== "" && (
        <Modal modalData={modalData} setModalData={setModalData} />
      )}
      <AnimatePresence>
        {blogModal && (
          <BlogModal setBlogModal={setBlogModal} setModalData={setModalData} />
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  );
}
