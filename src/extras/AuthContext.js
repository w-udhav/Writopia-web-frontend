import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../Utils/api/axiosInstance";
import SessionExpired from "../Components/Modal";
import Modal from "../Components/Modal";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
        setShowModal(true); // Show the modal
        setModalData({
          type: "ERROR",
          msg: "Session Expired. Please login again.",
        });
      }
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getUserData();
    }
  }, []);

  useEffect(() => {
    if (modalData.type) {
      setTimeout(() => {
        setModalData({
          type: "",
          msg: "",
        });
      }, 5000);
    }
  }, [modalData]);

  useEffect(() => {
    if (user) {
      setShowModal(false);
    }
  }, [user]);

  useEffect(() => {
    if (showModal) {
      navigate("/auth/login"); // Navigate to the login page
    }
  }, [showModal, navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        modalData,
        setModalData,
      }}
    >
      {children}
      {showModal && <Modal type="ERROR" msg="" />}
    </AuthContext.Provider>
  );
}
