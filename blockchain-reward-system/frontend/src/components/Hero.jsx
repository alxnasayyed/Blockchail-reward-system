import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";

const Hero = () => {
  return (
    <Box sx={{ height: "100vh", backgroundImage: 'url("/hero-bg.jpg")', backgroundSize: "cover", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <Container>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "white" }}>
          Welcome to EcoRecycle
        </Typography>
        <Typography variant="h6" sx={{ color: "white", marginBottom: "20px" }}>
          Your trusted partner in waste management & sustainability
        </Typography>
        <Button variant="contained" color="primary">
          Learn More
        </Button>
      </Container>
    </Box>
  );
};

export default Hero;
