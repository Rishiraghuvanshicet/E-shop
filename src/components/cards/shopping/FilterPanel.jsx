// src/components/shopping/FilterPanel.jsx
import React from "react";
import {
  Paper,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FilterPanel = ({
  material,
  setMaterial,
  priceRange,
  setPriceRange,
  ratio,
  setRatio,
  onClose,
}) => {
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        height: "fit-content",
        position: { xs: "relative", md: "sticky" },
        top: { md: 20 },
        backgroundColor: "#fff",
        minWidth: { md: 280 },
        // Prevent inner content from shrinking
        flexShrink: 0,
      }}
    >
      {/* Header with Close Button (Mobile Only) */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Filters
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ p: 0 }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Title (Desktop Only) */}
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        Filters
      </Typography>

      {/* Material Filter */}
      <Box>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
          Material
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            displayEmpty
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
              },
            }}
          >
            <MenuItem value="">All Materials</MenuItem>
            <MenuItem value="cotton">Cotton</MenuItem>
            <MenuItem value="denim">Denim</MenuItem>
            <MenuItem value="silk">Silk</MenuItem>
            <MenuItem value="wool">Wool</MenuItem>
            <MenuItem value="polyester">Polyester</MenuItem>
            <MenuItem value="linen">Linen</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Price Range Filter */}
      <Box>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
          Price Range (₹)
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={5000}
          step={100}
          sx={{
            "& .MuiSlider-thumb": {
              backgroundColor: "#1976d2",
              "&:hover": {
                boxShadow: "0 0 0 8px rgba(25, 118, 210, 0.16)",
              },
            },
            "& .MuiSlider-track": {
              backgroundColor: "#42a5f5",
            },
            "& .MuiSlider-rail": {
              backgroundColor: "#e0e0e0",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Typography variant="body2" fontWeight={500} color="primary">
            ₹{priceRange[0].toLocaleString()}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            to
          </Typography>
          <Typography variant="body2" fontWeight={500} color="primary">
            ₹{priceRange[1].toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {/* Ratio Filter
      <Box>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
          Ratio
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={ratio}
            onChange={(e) => setRatio(e.target.value)}
            displayEmpty
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="0.5">50%</MenuItem>
            <MenuItem value="0.75">75%</MenuItem>
            <MenuItem value="1">100%</MenuItem>
          </Select>
        </FormControl>
      </Box> */}

      {/* Clear Filters Button */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography
          onClick={() => {
            setMaterial("");
            setPriceRange([500, 4000]);
            setRatio("");
          }}
          sx={{
            flex: 1,
            py: 1.2,
            px: 2,
            textAlign: "center",
            border: "1px solid #1976d2",
            borderRadius: 1,
            color: "#1976d2",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.04)",
            },
          }}
          component="button"
        >
          Clear
        </Typography>
      </Box>
    </Paper>
  );
};

export default FilterPanel;