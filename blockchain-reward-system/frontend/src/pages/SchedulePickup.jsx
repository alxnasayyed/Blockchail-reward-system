import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SchedulePickup = () => {
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSchedule = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post("http://localhost:5000/api/schedule-pickup", {
        userId: user.id,
        date,
        address,
      });

      alert("Waste Pickup Scheduled Successfully!");
      navigate("/dashboard/user");
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Failed to schedule pickup.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Schedule Waste Pickup</Typography>
      <TextField 
        label="Date" 
        type="date" 
        fullWidth 
        margin="normal" 
        InputLabelProps={{ shrink: true }} 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
      />
      <TextField 
        label="Pickup Address" 
        fullWidth 
        margin="normal" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleSchedule}>
        Schedule Pickup
      </Button>
    </Container>
  );
};

export default SchedulePickup;
