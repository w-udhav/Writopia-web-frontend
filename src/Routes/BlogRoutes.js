import React from "react";
import { Route, Routes } from "react-router-dom";
import AllBlogs from "../Pages/Blogs/AllBlogs";
import SingleBlog from "../Pages/Blogs/SingleBlog";

export default function BlogRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AllBlogs />} />
      <Route path="/:id" element={<SingleBlog />} />
    </Routes>
  );
}
