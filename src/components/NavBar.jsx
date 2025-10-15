// src/components/NavBar.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, IconButton, Tooltip, useMediaQuery, Badge, Menu, MenuItem } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
  const { itemCount, clearCart } = useCart() || { itemCount: 0, clearCart: () => {} };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);
  const goto = (path) => {
    navigate(path);
    handleMenuClose();
  };
  const handleLoginClick = () => {
    if (isAuthenticated) {
      logout();
      clearCart();
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

          {/* Profile Menu + Login/Logout */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              id="account-menu-button"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleMenuClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ textTransform: "none", color: "#1976d2" }}
            >
              Menu
            </Button>
            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => goto("/friends")} disabled={!isAuthenticated}>Friends</MenuItem>
              <MenuItem onClick={() => goto("/profile")} disabled={!isAuthenticated}>Profile</MenuItem>
              <MenuItem onClick={handleLoginClick}>{isAuthenticated ? "Logout" : "Login"}</MenuItem>
            </Menu>
            <Tooltip title="Cart">
              <IconButton component={Link} to="/cart" sx={{ color: "#1976d2" }}>
                <Badge color="primary" badgeContent={isAuthenticated ? itemCount : 0} overlap="circular">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
