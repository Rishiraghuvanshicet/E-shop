// src/components/NavBar.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, IconButton, Tooltip, useMediaQuery, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const pages = ["Men", "Women"];

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();
  const { itemCount } = useCart() || { itemCount: 0 };
  const handleLoginClick = () => {
    if (isAuthenticated) {
      logout();
      toast.info("Logged out.");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "sticky",
        top: 20,
        zIndex: 1100,
        mx: 2,
        mt: 2,
      }}
    >
      <AppBar
        position="static"
        elevation={3}
        sx={{
          bgcolor: "#fff",
          color: "black",
          borderRadius: 2,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            px: isMobile ? 2 : 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: 700,
              letterSpacing: 1,
              fontSize: isMobile ? "1rem" : "1.25rem",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            MyStore
          </Typography>

          {/* Navigation Links */}
          <Box sx={{ display: "flex", gap: isMobile ? 1.5 : 3 }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/shop/${page.toLowerCase()}`}
                sx={{
                  color: "black",
                  fontWeight: 500,
                  textTransform: "none",
                  fontSize: isMobile ? "0.875rem" : "1rem",
                  position: "relative",
                  "&:hover": {
                    color: "#1976d2",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: -4,
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#1976d2",
                    },
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Login/Logout Button */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="Cart">
              <IconButton component={Link} to="/cart" sx={{ color: "#1976d2" }}>
                <Badge color="primary" badgeContent={itemCount} overlap="circular">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            {isMobile ? (
              <Tooltip title={isAuthenticated ? "Logout" : "Login"}>
                <IconButton
                  sx={{ color: "#1976d2" }}
                  onClick={handleLoginClick}
                >
                  <LoginIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Button
                sx={{
                  border: "1px solid #1976d2",
                  color: "#1976d2",
                  borderRadius: "20px",
                  px: 2,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#1976d2",
                    color: "#fff",
                  },
                }}
                startIcon={<LoginIcon />}
                onClick={handleLoginClick}
              >
                {isAuthenticated ? "Logout" : "Login"}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
