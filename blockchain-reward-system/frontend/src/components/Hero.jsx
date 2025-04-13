import React from "react";
import { Container, Typography, Button, Box, Stack } from "@mui/material";

const Hero = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: 'url("/images/hero-image1.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          padding: "40px",
          
          borderRadius: "25px",
          
          
          textAlign: "center",
          maxWidth: "600px",
          width: "90%",
        }}
      >
        <Typography variant="h3"
        sx={{
          fontWeight: "bold",
          color: "white",
          fontFamily: "'Candara', serif"
        }}
>
  Welcome to EcoRecycle
</Typography>

        <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
          Your trusted partner in waste management & sustainability
        </Typography>
        <Button
  variant="contained"
  sx={{
    backgroundColor: "rgba(255, 255, 255, 0.2)", // transparent white
    backdropFilter: "blur(10px)", // blur effect
    border: "1px solid rgba(255, 255, 255, 0.3)", // subtle border
    color: "white", // text color
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // optional shadow
    borderRadius: "12px", // rounded corners
    padding: "10px 20px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
  }}
>
  Learn More
</Button>

      </Box>
    </Box>
  );
};

export default Hero;
