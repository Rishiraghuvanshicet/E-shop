import React, { useEffect, useState } from "react";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    // Placeholder endpoints; to be implemented server-side if needed
    await axios.post("http://localhost:5000/api/auth/profile/update", { email, password });
    alert("Profile update request sent");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <NavBar />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>Profile</Typography>
          <Box component="form" onSubmit={handleSave}>
            <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
            <TextField fullWidth label="New Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />
            <Button type="submit" variant="contained">Save</Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfilePage;


