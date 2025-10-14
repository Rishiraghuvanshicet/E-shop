import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopingPage from "./pages/ShopingPage";
import "./index.css";
import PrivateRoute from "./auth/PrivateRoute";
import { ToastContainer} from "react-toastify";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/shop/:category"
          element={
            <PrivateRoute>
              <ShopingPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}
