import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, IconButton, Tooltip, useMediaQuery } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useTheme } from "@mui/material/styles";

const pages = ["Men", "Women"];

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // xs & sm considered mobile

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
          {/* Left Logo */}
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

          {/* Center Nav Links */}
          <Box sx={{ display: "flex", gap: isMobile ? 1.5 : 3 }}>
            {pages.map((page) => (
              <Button
                key={page}
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

          {/* Right - Login Icon/Button */}
          <Box>
            {isMobile ? (
              <Tooltip title="Login">
                <IconButton
                  sx={{
                    color: "#1976d2",
                  }}
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
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
