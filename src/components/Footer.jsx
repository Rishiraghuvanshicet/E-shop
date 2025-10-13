import * as React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1A1A1A',
        color: '#FFFFFF',
        mt: 10,
        pt: 6,
        pb: 4,
        fontFamily: '"Poppins", sans-serif',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* About Section */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, fontSize: '1.25rem' }}
            >
              About Our Brand
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc' }}>
              We are a premium fashion destination providing hand-picked collections of jackets, streetwear, and more. Our mission is to blend style and comfort with sustainability. Explore trends that speak your vibe.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, fontSize: '1.25rem' }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover">Home</Link>
              <Link href="#" color="inherit" underline="hover">New Arrivals</Link>
              <Link href="#" color="inherit" underline="hover">Best Sellers</Link>
              <Link href="#" color="inherit" underline="hover">Gift Cards</Link>
              <Link href="#" color="inherit" underline="hover">Blog</Link>
              <Link href="#" color="inherit" underline="hover">Contact Us</Link>
              <Link href="#" color="inherit" underline="hover">FAQs</Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, fontSize: '1.25rem' }}
            >
              Get in Touch
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
              Have questions or feedback? We’d love to hear from you.
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              📧 Email: support@yourbrand.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              📞 Phone: +1 (234) 567-8901
            </Typography>
            <Typography variant="body2">
              📍 Address: 456 Brand Ave, Fashion City, NY 10001
            </Typography>
          </Grid>
        </Grid>

        {/* Divider */}
        <Box sx={{ borderTop: '1px solid #333', mt: 5, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#888' }}>
            © {new Date().getFullYear()} Your Brand Name. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
