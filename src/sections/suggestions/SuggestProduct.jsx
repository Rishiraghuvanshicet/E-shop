import { products } from "../../data/homePage/Product";
import { Box, Typography } from "@mui/material";
import ProductCards from "../../cards/suggestions/ProductCards";

const SuggestProduct = () => {
  return (
    <Box
      sx={{
        maxWidth: 1900,
        mx: "auto",
        mt:6
      }}
    >
      {/* <Typography
        variant="h4"
        sx={{
          mb: 5,
          textAlign: "center",
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        Suggested Products
      </Typography> */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          alignItems: "center",
        }}
      >
        {products.map(({ id, category, image }) => (
          <ProductCards key={id} category={category} image={image} />
        ))}
      </Box>
    </Box>
  );
};

export default SuggestProduct;
