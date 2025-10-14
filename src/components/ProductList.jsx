import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import ProductCard from "./cards/shopping/ProductCard";

const ProductsList = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          No products found
        </Typography>
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 3, md: 4 }}
      justifyContent={{ xs: "center", md: "flex-start" }}
      alignItems="stretch"
    >
      {products.map((product) => (
        <Grid
          item
          key={product._id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsList;
