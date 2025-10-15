import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { createProduct } from "../data/shopingPage/ProductApi";
import NavBar from "../components/NavBar";

const AdminPage = () => {
  const [form, setForm] = useState({
    name: "",
    category: "men",
    material: "",
    price: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    setImageFile(file || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please choose an image file");
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("category", form.category);
      fd.append("material", form.material);
      fd.append("price", form.price);
      fd.append("description", form.description);
      fd.append("image", imageFile);

      await createProduct(fd);
      alert("Product created successfully");
      setForm({ name: "", category: "men", material: "", price: "", description: "" });
      setImageFile(null);
    } catch (err) {
      alert("Failed to create product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <NavBar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
            Admin: Create Product
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField name="name" label="Name" fullWidth value={form.name} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select name="category" label="Category" fullWidth value={form.category} onChange={handleChange}>
                  <MenuItem value="men">men</MenuItem>
                  <MenuItem value="women">women</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="material" label="Material" fullWidth value={form.material} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="price" label="Price" type="number" fullWidth value={form.price} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button component="label" variant="outlined" fullWidth sx={{ height: "56px" }}>
                  {imageFile ? imageFile.name : "Choose Image"}
                  <input type="file" accept="image/*" hidden onChange={handleFile} />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField name="description" label="Description" fullWidth multiline rows={3} value={form.description} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" disabled={submitting}>
                  {submitting ? "Uploading..." : "Create"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminPage;


