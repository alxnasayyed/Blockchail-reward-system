import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css"; // ✅ Import new styles

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const user = await login(email.trim(), password);
      console.log("✅ User Logged In:", user);
      console.log("🔄 Redirecting to:", `/dashboard/${user.role}`);

      switch (user.role) {
        case "user":
          navigate("/dashboard/user", { replace: true });
          break;
        case "admin":
          navigate("/dashboard/admin", { replace: true });
          break;
        case "recycler":
          navigate("/dashboard/recycler", { replace: true });
          break;
        case "collector":
          navigate("/dashboard/collector", { replace: true });
          break;
        default:
          alert("Invalid role. Contact admin.");
          navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("❌ Login Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <Paper elevation={5} className="login-box">
        <Typography variant="h4" gutterBottom>Login</Typography>
        <TextField 
          label="Email" 
          fullWidth 
          margin="normal" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="input-field"
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="input-field"
        />
        <Button variant="contained" fullWidth className="login-btn" onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </div>
  );
};

export default Login;
