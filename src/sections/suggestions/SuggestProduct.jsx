import { products } from "../../data/homePage/Product";
import { Box, Container } from "@mui/material";
import ProductCards from "../../components/cards/suggestions/ProductCards";

const SuggestProduct = () => {
  return (
    <Container sx={{ mt: 6 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",         // Mobile: 1 column
            sm: "repeat(2, 1fr)", // Tablet: 2 columns
            md: "repeat(4, 1fr)", // Desktop: 4 columns
          },
          gap: 3,
        }}
      >
        {products.map(({ id, category, image }) => (
          <ProductCards key={id} category={category} image={image} />
        ))}
      </Box>
    </Container>
  );
};

export default SuggestProduct;
