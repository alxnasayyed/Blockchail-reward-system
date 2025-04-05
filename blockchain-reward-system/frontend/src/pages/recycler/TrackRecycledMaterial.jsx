import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";

const RecyclerDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  const styles = {
    dashboardContainer: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: 'url("/recycler-bg-new.jpg") no-repeat center center',
      backgroundSize: "cover",
      padding: "20px",
    },
    dashboardGrid: {
      width: "100%",
      maxWidth: "600px",
    },
    dashboardCard: {
      background: "rgba(255, 255, 255, 0.9)", // ✅ Slight transparency for better visibility
      color: "#000", // ✅ Make text visible
      textAlign: "center",
      padding: "20px",
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out, background 0.3s ease-in-out",
      borderRadius: "10px",
      marginBottom: "15px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    dashboardCardHover: {
      transform: "scale(1.05)",
      background: "rgba(255, 255, 255, 1)",
    },
    icon: {
      fontSize: "40px", // ✅ Bigger icons
      marginBottom: "10px",
    },
  };

  return (
    <Container style={styles.dashboardContainer}>
      <Grid container spacing={2} style={styles.dashboardGrid}>
        
        {/* 📌 View Scheduled Pickups */}
        <Grid item xs={12}>
          <Card
            style={styles.dashboardCard}
            onClick={() => handleCardClick("/recycler/scheduled-pickups")}
            onMouseOver={(e) => (e.currentTarget.style.transform = styles.dashboardCardHover.transform)}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <CardContent>
              <Typography style={styles.icon}>📅</Typography>
              <Typography variant="h6" color="textPrimary">View Scheduled Pickups</Typography>
              <Typography variant="body2">Check waste collection requests.</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 📌 Confirm Waste Pickup */}
        <Grid item xs={12}>
          <Card
            style={styles.dashboardCard}
            onClick={() => handleCardClick("/recycler/confirm-pickup")}
            onMouseOver={(e) => (e.currentTarget.style.transform = styles.dashboardCardHover.transform)}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <CardContent>
              <Typography style={styles.icon}>✅</Typography>
              <Typography variant="h6" color="textPrimary">Confirm Waste Pickup</Typography>
              <Typography variant="body2">Mark a pickup as completed.</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 📌 Upload Recycling Report */}
        <Grid item xs={12}>
          <Card
            style={styles.dashboardCard}
            onClick={() => handleCardClick("/recycler/upload-report")}
            onMouseOver={(e) => (e.currentTarget.style.transform = styles.dashboardCardHover.transform)}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <CardContent>
              <Typography style={styles.icon}>📄</Typography>
              <Typography variant="h6" color="textPrimary">Upload Recycling Report</Typography>
              <Typography variant="body2">Submit completed reports.</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 📌 Track Recycled Material */}
        <Grid item xs={12}>
          <Card
            style={styles.dashboardCard}
            onClick={() => handleCardClick("/recycler/track-recycled")}
            onMouseOver={(e) => (e.currentTarget.style.transform = styles.dashboardCardHover.transform)}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <CardContent>
              <Typography style={styles.icon}>♻️</Typography>
              <Typography variant="h6" color="textPrimary">Track Recycled Material</Typography>
              <Typography variant="body2">Monitor the recycling process.</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 📌 Distribute Tokens */}
        <Grid item xs={12}>
          <Card
            style={styles.dashboardCard}
            onClick={() => handleCardClick("/recycler/distribute-tokens")}
            onMouseOver={(e) => (e.currentTarget.style.transform = styles.dashboardCardHover.transform)}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <CardContent>
              <Typography style={styles.icon}>🎁</Typography>
              <Typography variant="h6" color="textPrimary">Distribute Tokens</Typography>
              <Typography variant="body2">Reward users for recycling.</Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
};

export default RecyclerDashboard;
