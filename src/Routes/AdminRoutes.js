import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminTemp from "../Containers/AdminTemp";
import Create from "../Pages/Admin/Create";
import Dashboard from "../Pages/Admin/Dashboard";
import Category from "../Pages/Admin/Category";

export default function AdminRoutes({ user }) {
  if (user?.isAdmin)
    return (
      <AdminTemp>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create" element={<Create />} />
          <Route path="category" element={<Category />} />
          <Route path="manage" element={<h1>Manage Blog</h1>} />
        </Routes>
      </AdminTemp>
    );
}
