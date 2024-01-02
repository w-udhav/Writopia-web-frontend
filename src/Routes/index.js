import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import BlogRoutes from "./BlogRoutes";
import Home from "../Pages/Home/Home";

export default function Index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/blog/*" element={<BlogRoutes />} />

      {/* Other Routes */}
      <Route path="/about" element={<h1>About Page</h1>} />

      {/* Random Routes */}
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}
