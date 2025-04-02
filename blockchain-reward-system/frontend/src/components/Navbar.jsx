import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2c3e50" }}>
      <Toolbar>
        {/* ✅ App Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Recycling Rewards
          </Link>
        </Typography>

        {/* ✅ Show Login/Signup when no user is logged in */}
        {!user ? (
          <Box>
            <Button color="inherit" onClick={() => navigate("/signup")}>Sign Up</Button>
            <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" onClick={() => navigate(`/dashboard/${user.role}`)}>Dashboard</Button>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
