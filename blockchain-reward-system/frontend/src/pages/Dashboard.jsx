import React from "react";
import { Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: "20px" }}>
        <Typography variant="h4">User Dashboard</Typography>
        <Typography variant="h6">Welcome! Here you can manage your waste pickup schedules.</Typography>
      </Container>
    </>
  );
};

export default Dashboard;
