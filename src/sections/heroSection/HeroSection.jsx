import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "70vh", md: "80vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        marginTop: 5,
      }}
    >
      {/* 🔹 Background Video */}
      <video
        src="/videos/8311915-uhd_2160_4096_25fps.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      />

      {/* Overlay (for readability) */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(15, 42, 77, 0.6)",
          zIndex: -1,
        }}
      />

      {/*  Foreground Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 3, md: 6 },
          px: { xs: 2, md: 4 },
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {/* Left Circle - Clothing Image */}
        <Box
          sx={{
            width: { xs: 200, sm: 250, md: 300 },
            height: { xs: 200, sm: 250, md: 300 },
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 4px 25px rgba(0,0,0,0.3)",
          }}
        >
          <Box
            component="img"
            src="/images/OIP2.jpg"
            alt="Clothing"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        </Box>

        {/* Center Text */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#fff",
            textAlign: "center",
            px: 2,
            maxWidth: 500,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              letterSpacing: 2,
              opacity: 0.9,
              mb: 1,
              textTransform: "uppercase",
            }}
          >
            Our First-Ever Waterproof Collection
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            100% Chance of Comfort
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "#0f2a4d",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "25px",
                px: 3,
                py: 1,
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
              component={Link}
              to="/shop/men"
            >
              Shop Men
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "#0f2a4d",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "25px",
                px: 3,
                py: 1,
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
              component={Link}
              to="/shop/women"
            >
              Shop Women
            </Button>
          </Box>
        </Box>

        {/* Right Circle - Product Image */}
        <Box
          sx={{
            width: { xs: 200, sm: 250, md: 300 },
            height: { xs: 200, sm: 250, md: 300 },
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 4px 25px rgba(0,0,0,0.3)",
          }}
        >
          <Box
            component="img"
            src="/images/OIP.jpg" // 👉 shoe or product image
            alt="Product"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
