import React from "react";
import Navbar from "../components/Navbar";
import { Container, Typography, Box, Button, Grid, Card, CardContent } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* 🎉 Welcome Section */}
      <Box sx={{ height: "100vh", backgroundImage: 'url("/hero-bg.jpg")', backgroundSize: "cover", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", color: "white" }}>
        <Container>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Welcome to EcoRecycle
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            Earn rewards by recycling & reducing your carbon footprint!
          </Typography>
          <ScrollLink to="why-recycle" smooth={true} duration={800}>
            <Button variant="contained" color="primary">
              Learn More
            </Button>
          </ScrollLink>
        </Container>
      </Box>

      {/* ♻️ Why Recycle? */}
      <Box id="why-recycle" sx={{ padding: "50px", backgroundColor: "#ecf0f1" }}>
        <Container>
          <Typography variant="h3" align="center" gutterBottom>
            Why Recycle?
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary">
            Recycling helps reduce waste, conserve energy, and protect the environment.
          </Typography>
        </Container>
      </Box>

      {/* 🌍 What Are Carbon Footprints? */}
      <Box id="carbon-footprints" sx={{ padding: "50px", backgroundColor: "#dfe6e9" }}>
        <Container>
          <Typography variant="h3" align="center" gutterBottom>
            What Are Carbon Footprints?
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary">
            Your carbon footprint is the amount of greenhouse gases emitted due to your daily activities.
          </Typography>
        </Container>
      </Box>

      {/* 🏬 Retailers Who Give Rewards */}
      <Box id="retailers" sx={{ padding: "50px", backgroundColor: "#f5f5f5" }}>
        <Container>
          <Typography variant="h3" align="center" gutterBottom>
            Retailers Who Give Rewards
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Flipkart Green
                  </Typography>
                  <Typography variant="body2" align="center">
                    Offers discounts on eco-friendly products.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Amazon GoGreen
                  </Typography>
                  <Typography variant="body2" align="center">
                    Earn cashback for recycling used electronics.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Big Bazaar Green
                  </Typography>
                  <Typography variant="body2" align="center">
                    Exchange plastic bottles for shopping points.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 📌 About Us */}
      <Box id="about-us" sx={{ padding: "50px", backgroundColor: "#ecf0f1" }}>
        <Container>
          <Typography variant="h3" align="center" gutterBottom>
            About Us
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary">
            EcoRecycle is a blockchain-based reward system that incentivizes recycling to create a greener planet.
          </Typography>
        </Container>
      </Box>

      {/* 📞 Contact Us */}
      <Box id="contact-us" sx={{ padding: "50px", backgroundColor: "#2c3e50", color: "white" }}>
        <Container>
          <Typography variant="h3" align="center" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h6" align="center">
            Email: support@ecorecycle.com | Phone: +91 98765 43210
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Home;
