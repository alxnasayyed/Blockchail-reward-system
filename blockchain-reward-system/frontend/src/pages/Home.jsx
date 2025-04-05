import React from "react";
import Navbar from "../components/Navbar";
import { Container, Typography, Box, Button, Grid, Card, CardContent } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import { useInView } from "react-intersection-observer";
import "../styles/Home.css"; // ✅ Add custom styles

const Section = ({ id, title, text, children }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <Box id={id} ref={ref} className={`section ${inView ? "fade-in" : "hidden"}`}>
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary">
          {text}
        </Typography>
        {children}
      </Container>
    </Box>
  );
};

const Home = () => {
  return (
    <>
      <Navbar />

      {/* 🎉 Welcome Section */}
      <Box
        sx={{
          height: "100vh",
          backgroundImage: 'url("/hero-bg.jpg")',
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
        }}
      >
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
      <Section id="why-recycle" title="Why Recycle?" text="Recycling helps reduce waste, conserve energy, and protect the environment." />

      {/* 🌎 How It Affects the Environment */}
      <Section id="how-it-affects" title="How It Affects the Environment" text="Excessive waste leads to pollution, deforestation, and climate change. Recycling reduces the negative impact on nature." />

      {/* 🌍 What Are Carbon Footprints? */}
      <Section id="carbon-footprints" title="What Are Carbon Footprints?" text="Your carbon footprint is the amount of greenhouse gases emitted due to your daily activities." />

      {/* 🏬 Retailers Who Give Rewards */}
      <Section id="retailers" title="Retailers Who Give Rewards">
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
      </Section>

      {/* 📌 About Us */}
      <Section id="about-us" title="About Us" text="EcoRecycle is a blockchain-based reward system that incentivizes recycling to create a greener planet." />

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
