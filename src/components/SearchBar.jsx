// src/components/SearchBar.jsx
import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: 3,
        width: "100%",
      }}
    >
      <TextField
        placeholder="Search products..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          width: { xs: "100%", sm: "70%", md: "50%" },
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 2,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
