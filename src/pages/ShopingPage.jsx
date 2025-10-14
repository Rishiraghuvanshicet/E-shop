import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Grid, Button, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchBar from "../components/SearchBar";
import ProductsList from "../components/ProductList";
import FilterPanel from "../components/cards/shopping/FilterPanel";
import { fetchProducts } from "../data/shopingPage/ProductApi";
import NavBar from "../components/NavBar";

const ShoppingPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [material, setMaterial] = useState("");
  const [priceRange, setPriceRange] = useState([500, 4000]);
  const [ratio, setRatio] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [category]);

  useEffect(() => {
    applyFilters();
  }, [material, priceRange, ratio, searchTerm, products]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(category, "", "");
      setProducts(data || []);
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = products;

    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (material) {
      filtered = filtered.filter(
        (p) => p.material.toLowerCase() === material.toLowerCase()
      );
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        <NavBar/>
      <Box
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: "#fff",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          sx={{ borderRadius: 1, fontSize: { xs: "0.75rem", sm: "1rem" } }}
        >
          Back to Home
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mb: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textTransform="capitalize"
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
          >
            {category} Collection
          </Typography>
        </Box>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Box>

      <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Button
          variant="outlined"
          startIcon={<MenuIcon />}
          onClick={() => setMobileFilterOpen(true)}
          fullWidth
          sx={{
            display: { xs: "flex", md: "none" },
            mb: 2,
            justifyContent: "center",
            py: 1.5,
            borderRadius: 1,
          }}
        >
          Open Filters
        </Button>

        <Grid
          container
          spacing={{ xs: 2, sm: 2.5, md: 3 }}
          alignItems="flex-start"
          wrap="nowrap"
          sx={{
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              display: { xs: "none", md: "block" },
              flexShrink: 0,
              minWidth: { md: 280 },
            }}
          >
            <FilterPanel
              material={material}
              setMaterial={setMaterial}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              ratio={ratio}
              setRatio={setRatio}
              onClose={() => {}}
            />
          </Grid>

          <Drawer
            anchor="left"
            open={mobileFilterOpen}
            onClose={() => setMobileFilterOpen(false)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <Box sx={{ width: 280, p: 0 }}>
              <FilterPanel
                material={material}
                setMaterial={setMaterial}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                ratio={ratio}
                setRatio={setRatio}
                onClose={() => setMobileFilterOpen(false)}
              />
            </Box>
          </Drawer>

          <Grid
            item
            xs={12}
            md={9}
            sx={{
              minWidth: 0,
            }}
          >
            {loading ? (
              <Paper sx={{ p: 4, textAlign: "center" }}>
                <Typography>Loading products...</Typography>
              </Paper>
            ) : filteredProducts.length === 0 ? (
              <Paper
                sx={{ p: 4, textAlign: "center", backgroundColor: "#fff" }}
              >
                <Typography variant="h6" color="textSecondary">
                  No products found matching your filters
                </Typography>
              </Paper>
            ) : (
              <>
                <ProductsList products={filteredProducts} />
                <Box sx={{ textAlign: "center", mt: 3 }}>
                  <Typography variant="body2" color="textSecondary">
                    Showing {filteredProducts.length} products
                  </Typography>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ShoppingPage;
