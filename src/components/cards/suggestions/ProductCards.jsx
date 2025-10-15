import React from "react";
import { Card, CardMedia, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const ProductCards = ({ category, image }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const goShop = () => {
    const isMen = /men/i.test(category);
    const isWomen = /women/i.test(category);
    const path = isMen ? "/shop/men" : isWomen ? "/shop/women" : "/shop/men";
    if (isAuthenticated) navigate(path);
    else navigate("/login");
  };
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 5,
        overflow: "hidden",
        cursor: "pointer",
        height: 520,
        transition: "all 0.4s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          "& .overlay": {
            opacity: 1,
          },
          "& img": {
            transform: "scale(1.1)",
          },
        },
      }}
      elevation={6}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        image={image}
        alt={category}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.4s ease",
        }}
      />

      {/* Overlay Text */}
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.8) 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: 0.8,
          transition: "opacity 0.4s ease",
        }}
      >
        {/* <Typography
          variant="h5"
          sx={{
            color: "#fff",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {category}
        </Typography> */}
        <Button
          variant="outlined"
          sx={{
            color: "#fff",
            borderColor: "#fff",
            borderWidth: 2,
            textTransform: "uppercase",
            fontWeight: 600,
            fontSize: "0.8rem",
            px: 3,
            py: 0.8,
            "&:hover": {
              backgroundColor: "#fff",
              color: "#000",
            },
          }}
          onClick={goShop}
        >
          {category.includes("Men")
            ? "Shop Men"
            : category.includes("Women")
            ? "Shop Women"
            : "Bestsellers"}
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCards;
