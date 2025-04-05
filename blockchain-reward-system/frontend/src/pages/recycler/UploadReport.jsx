import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@mui/material";

const UploadReport = () => {
  const [report, setReport] = useState(null);

  const handleFileChange = (e) => setReport(e.target.files[0]);

  const uploadReport = () => {
    const formData = new FormData();
    formData.append("report", report);

    axios.post("http://localhost:5000/api/recycler/upload-report", formData)
      .then(() => alert("Report uploaded successfully"))
      .catch(err => console.error(err));
  };

  return (
    <Container>
      <Typography variant="h4">📄 Upload Recycling Report</Typography>
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={uploadReport}>Upload</Button>
    </Container>
  );
};

export default UploadReport;
