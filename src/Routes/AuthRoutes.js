import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthTemp from "../Containers/AuthTemp";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";

export default function AuthRoutes() {
  return (
    <AuthTemp>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/forgot-password"
          element={<h1>Forgot Password Page</h1>}
        />
        <Route path="/reset-password" element={<h1>Reset Password Page</h1>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthTemp>
  );
}
