const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Adjust if needed
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// 🔥 SIGNUP ROUTE (UNCHANGED)
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate input
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();
        res.status(201).json({ success: true, message: "User created successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


// 🔥 LOGIN ROUTE (NEWLY ADDED)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // ✅ Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // ✅ Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            "your_secret_key",  // 🔥 Change this to an environment variable in production!
            { expiresIn: "1h" }
        );

        res.status(200).json({ 
            success: true,
            token, 
            user: { id: user._id, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
