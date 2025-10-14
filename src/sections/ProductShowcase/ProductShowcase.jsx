import React, { useRef, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { newArrivals, bestsellers } from "../../data/homePage/Product";

const ProductShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState("bestsellers");
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const currentProducts =
    selectedCategory === "bestsellers" ? bestsellers : newArrivals;

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#f9f9f9",
        py: { xs: 5, md: 8 },
        overflow: "hidden",
        backgroundImage:
          "radial-gradient(circle, #E0E0E0 1px, transparent 1px)",
        backgroundSize: "30px 30px",
        backgroundPosition: "50% 15%",
      }}
    >
      {/* Category Tabs */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          mb: 4,
          borderBottom: "1px solid #e0e0e0",
          pb: 1,
        }}
      >
        <Typography
          variant="h6"
          onClick={() => setSelectedCategory("bestsellers")}
          sx={{
            cursor: "pointer",
            fontWeight: selectedCategory === "bestsellers" ? "bold" : "normal",
            textDecoration:
              selectedCategory === "bestsellers" ? "underline" : "none",
            textUnderlineOffset: "8px",
            color: "text.primary",
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          BESTSELLERS
        </Typography>
        <Typography
          variant="h6"
          onClick={() => setSelectedCategory("newArrivals")}
          sx={{
            cursor: "pointer",
            fontWeight: selectedCategory === "newArrivals" ? "bold" : "normal",
            textDecoration:
              selectedCategory === "newArrivals" ? "underline" : "none",
            textUnderlineOffset: "8px",
            color: "text.primary",
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          NEW ARRIVALS
        </Typography>
      </Box>

      {/* Scrollable Product List */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          "::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          px: { xs: 1, sm: 2 },
          gap: { xs: 2, sm: 3 },
        }}
      >
        {currentProducts.map((product) => (
          <Box
            key={product.id}
            sx={{
              flexShrink: 0,
              width: {
                xs: "75%",
                sm: "50%",
                md: "33.33%",
                lg: "25%",
              },
              scrollSnapAlign: "center",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: { xs: 250, sm: 300, md: 320 },
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                backgroundColor: "#fff",
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={`Product ${product.id}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                component={Link}
                to="/shop/men"
              />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Scroll Arrows */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          pointerEvents: "none", // Prevent covering scrollable content
        }}
      >
        <IconButton
          onClick={() => handleScroll("left")}
          sx={{
            pointerEvents: "auto",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1px solid #ccc",
            "&:hover": {
              backgroundColor: "#fff",
            },
          }}
        >
          <ArrowBackIosNewIcon fontSize="medium" />
        </IconButton>
        <IconButton
          onClick={() => handleScroll("right")}
          sx={{
            pointerEvents: "auto",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1px solid #ccc",
            "&:hover": {
              backgroundColor: "#fff",
            },
          }}
        >
          <ArrowForwardIosIcon fontSize="medium" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ProductShowcase;
