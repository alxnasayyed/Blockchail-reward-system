import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, CardContent, Typography, Button, Grid } from "@mui/material";

const ScheduledPickups = () => {
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    // Fetch scheduled pickups
    axios.get("http://localhost:5000/api/recycler/scheduled-pickups")
      .then(res => setPickups(res.data))
      .catch(err => console.error(err));
  }, []);

  const acceptPickup = (id) => {
    axios.post(`http://localhost:5000/api/recycler/confirm-pickup/${id}`)
      .then(() => setPickups(pickups.filter(p => p.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>📅 Scheduled Pickups</Typography>
      <Grid container spacing={3}>
        {pickups.map(pickup => (
          <Grid item xs={12} md={6} key={pickup.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{pickup.type} Waste</Typography>
                <Typography variant="body2">Location: {pickup.location}</Typography>
                <Typography variant="body2">Date: {pickup.date}</Typography>
                <Button variant="contained" color="primary" onClick={() => acceptPickup(pickup.id)}>Accept Pickup</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ScheduledPickups;
