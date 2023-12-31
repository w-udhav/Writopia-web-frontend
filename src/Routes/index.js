import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import BlogRoutes from "./BlogRoutes";

export default function Index() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Route</h1>} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/blog/*" element={<BlogRoutes />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}
