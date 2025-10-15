import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);

  // Load cart for current user from localStorage
  useEffect(() => {
    if (user && isAuthenticated) {
      const key = `cart_${user.email || user.id}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          setItems(JSON.parse(saved));
        } catch (_) {
          setItems([]);
        }
      } else {
        setItems([]);
      }
    } else {
      // Hide cart when logged out but do not delete stored carts
      setItems([]);
    }
  }, [user, isAuthenticated]);

  // Persist cart per user
  useEffect(() => {
    if (user && isAuthenticated) {
      const key = `cart_${user.email || user.id}`;
      localStorage.setItem(key, JSON.stringify(items));
    }
  }, [items, user, isAuthenticated]);

  const addToCart = (product, quantity = 1) => {
    if (!product || !product._id) return;
    setItems((prev) => {
      const index = prev.findIndex((i) => i._id === product._id);
      if (index >= 0) {
        // Item already present: do not auto-increment; show info toast
        toast.info("Item already in cart. Update quantity in Cart page.");
        return prev;
      }
      toast.success("Added to cart");
      return [
        ...prev,
        {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          material: product.material,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((i) => i._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setItems((prev) =>
      prev.map((i) => (i._id === productId ? { ...i, quantity: Math.max(1, quantity) } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return { itemCount, subtotal };
  }, [items]);

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    ...totals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);


