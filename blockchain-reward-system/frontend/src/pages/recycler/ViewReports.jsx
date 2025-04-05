import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, List, ListItem, ListItemText, Button, Typography } from "@mui/material";

const ViewReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/recycler/reports")
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <Typography variant="h4">📜 View Recycling Reports</Typography>
      <List>
        {reports.map(report => (
          <ListItem key={report.id}>
            <ListItemText primary={`Report ID: ${report.id}`} />
            <Button variant="contained" color="primary" href={report.url} download>Download</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ViewReports;
