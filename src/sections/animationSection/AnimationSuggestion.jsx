import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { animationProduct } from "../../data/homePage/Product";

const AnimationSuggestion = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Change product every 8 seconds
  useEffect(() => {
    const productInterval = setInterval(() => {
      setCurrentProductIndex(
        (prevIndex) => (prevIndex + 1) % animationProduct.length
      );
    }, 2000);
    return () => clearInterval(productInterval);
  }, []);

  // Change video every 2 seconds
  useEffect(() => {
    const videoInterval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => {
        const productVideos = animationProduct[currentProductIndex].videos;
        return (prevIndex + 1) % productVideos.length;
      });
    }, 2000);
    return () => clearInterval(videoInterval);
  }, [currentProductIndex]);

  const currentProduct = animationProduct[currentProductIndex];
  const currentVideo = currentProduct.videos[currentVideoIndex];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: { xs: 2, md: 4, lg: 6 },
          alignItems: "stretch",
          width: "100%",
        }}
      >
        {/* LEFT: Product Info */}
        <Box
          sx={{
            backgroundColor: "#f9f9f9",
            borderRadius: { xs: "12px", md: "20px" },
            p: { xs: 2.5, sm: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            minHeight: { xs: "auto", md: "350px" },
          }}
        >
          <Typography
            variant="overline"
            sx={{
              letterSpacing: "2px",
              color: "text.secondary",
              fontSize: { xs: "0.7rem", md: "0.75rem" },
            }}
          >
            COMFORT BY NATURE
          </Typography>

          <Box
            component="img"
            src={currentProduct.image}
            alt={currentProduct.name}
            sx={{
              width: "100%",
              maxWidth: { xs: 220, md: 260 },
              height: "auto",
              mt: { xs: 2, md: 3 },
              mb: { xs: 2, md: 3 },
              borderRadius: "12px",
              objectFit: "contain",
            }}
          />

          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: { xs: 1.2, md: 1.5 },
              fontWeight: 600,
              fontSize: { xs: "1.5rem", md: "1.75rem" },
            }}
          >
            {currentProduct.name}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              maxWidth: 320,
              mb: { xs: 2.5, md: 3 },
              lineHeight: 1.5,
              fontSize: { xs: "0.85rem", md: "0.95rem" },
            }}
          >
            {currentProduct.description}
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
              variant="outlined"
              size={isMobile ? "small" : "medium"}
              sx={{
                borderColor: "text.primary",
                color: "text.primary",
                px: { xs: 2, md: 3 },
                py: { xs: 0.5, md: 0.75 },
                borderRadius: "20px",
                fontSize: { xs: "0.75rem", md: "0.85rem" },
                textTransform: "uppercase",
                fontWeight: 500,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "text.primary",
                  color: "#fff",
                },
              }}
            >
              Shop Men
            </Button>
            <Button
              variant="outlined"
              size={isMobile ? "small" : "medium"}
              sx={{
                borderColor: "text.primary",
                color: "text.primary",
                px: { xs: 2, md: 3 },
                py: { xs: 0.5, md: 0.75 },
                borderRadius: "20px",
                fontSize: { xs: "0.75rem", md: "0.85rem" },
                textTransform: "uppercase",
                fontWeight: 500,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "text.primary",
                  color: "#fff",
                },
              }}
            >
              Shop Women
            </Button>
          </Box>
        </Box>

        {/* RIGHT: Video Section */}
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: { xs: "12px", md: "20px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            aspectRatio: isMobile ? "9/10" : "1/1",
            minHeight: { xs: 280, md: 350 },
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <video
            key={currentVideo}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          >
            <source src={currentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </Box>
    </Container>
  );
};

export default AnimationSuggestion;
