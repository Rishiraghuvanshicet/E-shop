import React from "react";
import { Box, Typography, IconButton, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const CartPage = () => {
  const { items, itemCount, subtotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
      <NavBar/>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3,mt:5 }}>Your Cart ({itemCount})</Typography>

      {items.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Your cart is empty</Typography>
          <Button component={Link} to="/shop/men" variant="contained">Continue Shopping</Button>
        </Box>
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" }, gap: 3 }}>
          <Box>
            {items.map((item) => (
              <Box key={item._id} sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, mb: 2, bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}>
                <Box component="img" src={item.image} alt={item.name} sx={{ width: 80, height: 80, borderRadius: 2, objectFit: "cover" }} />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
                  <Typography color="text.secondary">₹{item.price.toLocaleString()}</Typography>
                </Box>
                <TextField
                  type="number"
                  size="small"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item._id, Number(e.target.value || 1))}
                  sx={{ width: 80 }}
                  inputProps={{ min: 1 }}
                />
                <Typography sx={{ width: 100, textAlign: "right", fontWeight: 600 }}>
                  ₹{(item.price * item.quantity).toLocaleString()}
                </Typography>
                <IconButton color="error" onClick={() => removeFromCart(item._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
          <Box sx={{ p: 3, bgcolor: "#fff", borderRadius: 2, boxShadow: 1, height: "fit-content" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Order Summary</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography color="text.secondary">Subtotal</Typography>
              <Typography>₹{subtotal.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography color="text.secondary">Shipping</Typography>
              <Typography>₹0</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: 700, mb: 3 }}>
              <Typography>Total</Typography>
              <Typography>₹{subtotal.toLocaleString()}</Typography>
            </Box>
            <Button fullWidth variant="contained" onClick={() => navigate("/checkout")}>Proceed to Checkout</Button>
            <Button fullWidth sx={{ mt: 1 }} onClick={clearCart}>Clear Cart</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;



