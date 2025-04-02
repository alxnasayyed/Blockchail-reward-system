import React, { useState } from "react";
import { TextField, Button, Container, Typography, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        role,
      });
  
      console.log("✅ Signup Response:", response.data); 
  
      if (response && response.data && response.data.success) {  
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        alert("Signup failed. Try again.");
      }
    } catch (error) {
      console.error("❌ Signup Error:", error.response?.data || error);
      alert("Error during signup. Please try again.");
    }
  };
  

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Signup</Typography>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* 🔹 Role Selection */}
      <TextField
        select
        label="Select Role"
        fullWidth
        margin="normal"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="recycler">Recycler</MenuItem>
        <MenuItem value="collector">Collector</MenuItem>
      </TextField>

      <Button variant="contained" color="primary" fullWidth onClick={handleSignup}>
        Create Account
      </Button>
    </Container>
  );
};

export default Signup;
