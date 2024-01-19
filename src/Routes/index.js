import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import BlogRoutes from "./BlogRoutes";
import Home from "../Pages/Home/Home";
import { AuthContext } from "../extras/AuthContext";
import AdminRoutes from "./AdminRoutes";

function PrivateRoute({ children, user }) {
  const location = useLocation();

  return children;
}

export default function Index() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home user={user} />} />
      <Route path="auth/*" element={<AuthRoutes />} />
      <Route
        path="blog/*"
        element={
          <PrivateRoute user={user}>
            <BlogRoutes />
          </PrivateRoute>
        }
      />
      <Route path="about" element={<h1>About Page</h1>} />
      //! Admin Only
      <Route path="admin/*" element={<AdminRoutes user={user} />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}
