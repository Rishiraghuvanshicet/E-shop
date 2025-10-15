import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../data/shopingPage/ProductApi";
import { Box, Button, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import { useCart } from "../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const load = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    load();
  }, [id]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <NavBar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        {!product ? (
          <Typography>Loading...</Typography>
        ) : (
          <Card sx={{ display: { xs: "block", md: "flex" }, p: 2 }}>
            <CardMedia component="img" image={product.image} alt={product.name} sx={{ width: { xs: "100%", md: 420 }, height: { xs: 260, md: 420 }, objectFit: "cover", borderRadius: 2 }} />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: "1.1rem", md: "1.5rem" } }}>{product.name}</Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 2, fontSize: { xs: "0.85rem", md: "1rem" } }}>{product.description || "No description available."}</Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>₹{(product.price || 0).toLocaleString()}</Typography>
              <Button variant="contained" onClick={() => addToCart(product, 1)}>Add to Cart</Button>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default ProductDetailPage;


