import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { useCart } from "../../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <Card
      sx={{
        width: { xs: 250, sm: 280, md: 300 },
        minHeight: { xs: 360, sm: 400, md: 440 },
        borderRadius: 3,
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        mx: "auto",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ overflow: "hidden", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
        <CardMedia
          component="img"
          height={{ xs: 180, sm: 200, md: 220 }}
          image={product.image}
          alt={product.name}
          sx={{
            objectFit: "cover",
            transition: "transform 0.5s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
      </Box>

      <CardContent sx={{ pt: 2, pb: 1 }}>
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 600,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5, fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" } }}
        >
          {product.material} • ₹{product.price.toLocaleString()}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2 }}>
        <Button
          size="medium"
          variant="contained"
          fullWidth
          sx={{
            background: "linear-gradient(90deg, #1976d2, #42a5f5)",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 3,
            py: 1.2,
            textTransform: "none",
            transition: "0.3s",
            "&:hover": {
              background: "linear-gradient(90deg, #1565c0, #1e88e5)",
            },
          }}
        onClick={() => addToCart(product, 1)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
