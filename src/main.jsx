// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProductProvider from "./context/ProductProvider.jsx"; 
import { CartProvider } from "./context/CartContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ProductProvider>
      <CartProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </CartProvider>
    </ProductProvider>
  </AuthProvider>
);
