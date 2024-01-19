import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthTemp from "../Containers/AuthTemp";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import Verfiying from "../Pages/Auth/Verfiying";

export default function AuthRoutes() {
  return (
    <AuthTemp>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verifying" element={<Verfiying />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </AuthTemp>
  );
}
