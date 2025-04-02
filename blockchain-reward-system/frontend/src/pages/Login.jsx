import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios"; // ✅ Import axios for direct API call debugging

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("🔍 Sending Login Request:", { email, password });

      // ✅ Direct API Call to Debug the Response
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log("✅ Login Response:", response.data); // Debugging Line

      if (!response.data || !response.data.success) {
        alert("Login failed. Please check your credentials.");
        return;
      }

      const user = response.data.user;
      console.log("🔹 Logged in User:", user);

      // ✅ Redirect Based on Role
      switch (user.role) {
        case "user":
          navigate("/dashboard/user");
          break;
        case "admin":
          navigate("/dashboard/admin");
          break;
        case "recycler":
          navigate("/dashboard/recycler");
          break;
        case "collector":
          navigate("/dashboard/collector");
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error);
      alert("Login Failed. Please try again.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>Login</Button>
    </Container>
  );
};

export default Login;
