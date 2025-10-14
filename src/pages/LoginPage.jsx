// src/pages/LoginPage.jsx
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
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(email,password)
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);

        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        login();
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      const message =
        err.response?.data?.message || "Invalid credentials. Try again.";
      toast.error(message);
    }
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        alignContent: "center",
        background:
          "linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #64b5f6 100%)",
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
              "url('https://cdn.pixabay.com/photo/2016/11/29/03/53/online-1869309_1280.jpg')",
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
              Welcome Back
            </Typography>
            <Typography
              variant="body2"
              textAlign="center"
              color="text.secondary"
              mb={3}
            >
              Please login to continue
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                endIcon={<LoginIcon />}
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(25, 118, 210, 0.4)",
                  },
                }}
              >
                Login
              </Button>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 3, textAlign: "center" }}
            >
              Use <strong>user@example.com</strong> / <strong>123456</strong> to
              login
            </Typography>

            <Typography
              variant="body2"
              textAlign="center"
              sx={{ mt: 2, color: "text.secondary" }}
            >
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                style={{
                  color: "#1976d2",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Register here
              </span>
            </Typography>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
