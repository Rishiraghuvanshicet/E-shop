// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import axios from "axios";

const SERVER_BASE = import.meta.env.VITE_SERVER_BASE_URL || "https://e-store-backend-eydi.onrender.com";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${SERVER_BASE}/api/auth/register`, {
        name: fullName,
        email,
        password,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed. Please try again.");
      return;
    }
    toast.success("Registered successfully! Please login.");
    navigate("/login");
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #42a5f5 0%, #64b5f6 50%, #90caf9 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!isMobile && (
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2015/01/08/18/25/startup-593327_1280.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={6}
            sx={{
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255,255,255,0.85)",
              p: 5,
              borderRadius: 4,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              fontWeight={700}
              gutterBottom
              color="primary"
            >
              Create Account
            </Typography>
            <Typography
              variant="body2"
              textAlign="center"
              color="text.secondary"
              mb={3}
            >
              Join us to explore more
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                margin="normal"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                margin="normal"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                endIcon={<PersonAddAlt1Icon />}
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(66,165,245,0.4)",
                  },
                }}
              >
                Register
              </Button>
            </Box>

            <Typography
              variant="body2"
              textAlign="center"
              sx={{ mt: 2, color: "text.secondary" }}
            >
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                style={{
                  color: "#1976d2",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Login here
              </span>
            </Typography>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
