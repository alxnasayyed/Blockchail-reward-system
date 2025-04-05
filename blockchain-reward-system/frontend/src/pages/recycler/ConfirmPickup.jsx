import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@mui/material";

const ConfirmPickup = () => {
  const [pickupId, setPickupId] = useState("");

  const confirmPickup = () => {
    axios.post(`http://localhost:5000/api/recycler/confirm-pickup/${pickupId}`)
      .then(() => alert("Pickup marked as completed"))
      .catch(err => console.error(err));
  };

  return (
    <Container>
      <Typography variant="h4">✅ Confirm Waste Pickup</Typography>
      <TextField label="Pickup ID" value={pickupId} onChange={(e) => setPickupId(e.target.value)} fullWidth />
      <Button variant="contained" color="primary" onClick={confirmPickup}>Confirm Pickup</Button>
    </Container>
  );
};

export default ConfirmPickup;
