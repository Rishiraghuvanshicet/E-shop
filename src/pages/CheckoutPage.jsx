import React, { useState } from "react";
import { Box, Typography, TextField, Grid, Button, Paper } from "@mui/material";
import { useCart } from "../context/CartContext";
import NavBar from "../components/NavBar";

const CheckoutPage = () => {
  const { items, subtotal, itemCount, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleConfirm = () => {
    // placeholder confirmation
    alert(`Booking confirmed for ${itemCount} item(s). Total ₹${subtotal.toLocaleString()}`);
    clearCart();
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
      <NavBar/>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3,mt:5 }}>Checkout</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Billing Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Full Name" name="name" value={form.name} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Address" name="address" value={form.address} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="City" name="city" value={form.city} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="ZIP Code" name="zip" value={form.zip} onChange={handleChange} />
              </Grid>
            </Grid>
            <Button variant="contained" sx={{ mt: 3 }} onClick={handleConfirm}>Confirm Booking</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Order Summary</Typography>
            {items.map((i) => (
              <Box key={i._id} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>{i.name} × {i.quantity}</Typography>
                <Typography>₹{(i.price * i.quantity).toLocaleString()}</Typography>
              </Box>
            ))}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, fontWeight: 700 }}>
              <Typography>Total</Typography>
              <Typography>₹{subtotal.toLocaleString()}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;


