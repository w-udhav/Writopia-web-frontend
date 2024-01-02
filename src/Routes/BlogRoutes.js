import React from "react";
import { Route, Routes } from "react-router-dom";

export default function BlogRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>Blog Home</h1>} />
      <Route path="/:id" element={<h1>Blog Post</h1>} />
    </Routes>
  );
}
