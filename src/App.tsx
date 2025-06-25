import React from "react";
import { Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import CategoryManagement from "./components/CategoryManagement";
import ProductsManagement from "./components/ProductManagement";
import StockManagement from "./components/StockManagement";
import UserProfile from "./components/UserProfile";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Auth />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />

      {/* Protected Dashboard Layout with Nested Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="products" element={<ProductsManagement />} />
        <Route path="stocks" element={<StockManagement />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
