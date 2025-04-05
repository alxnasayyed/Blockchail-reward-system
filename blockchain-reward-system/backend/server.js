require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const historyRoutes = require("./routes/history");
const User = require("./models/User");
const Collector = require("./models/Collector");
const Recycler = require("./models/Recycler");
const Admin = require("./models/Admin");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);

// ✅ Route to update MetaMask wallet address for different roles
async function updateWallet(req, res, Model, role) {
    const { userId, wallet } = req.body;
    try {
        const user = await Model.findByIdAndUpdate(userId, { walletAddress: wallet }, { new: true });
        if (!user) return res.status(404).json({ message: `❌ ${role} not found` });

        res.json({ message: `✅ ${role} Wallet updated successfully`, user });
    } catch (error) {
        res.status(500).json({ message: `❌ Error updating ${role} wallet`, error });
    }
}

app.post("/api/auth/update-wallet/user", (req, res) => updateWallet(req, res, User, "User"));
app.post("/api/auth/update-wallet/collector", (req, res) => updateWallet(req, res, Collector, "Collector"));
app.post("/api/auth/update-wallet/recycler", (req, res) => updateWallet(req, res, Recycler, "Recycler"));
app.post("/api/auth/update-wallet/admin", (req, res) => updateWallet(req, res, Admin, "Admin"));

// ✅ Route to fetch user details
async function fetchUser(req, res, Model, role) {
    try {
        const userId = req.query.userId;
        if (!userId) return res.status(400).json({ message: `❌ ${role} ID required` });

        const user = await Model.findById(userId);
        if (!user) return res.status(404).json({ message: `❌ ${role} not found` });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: `❌ Error fetching ${role}`, error });
    }
}

app.get("/api/auth/user", (req, res) => fetchUser(req, res, User, "User"));
app.get("/api/auth/collector", (req, res) => fetchUser(req, res, Collector, "Collector"));
app.get("/api/auth/recycler", (req, res) => fetchUser(req, res, Recycler, "Recycler"));
app.get("/api/auth/admin", (req, res) => fetchUser(req, res, Admin, "Admin"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
