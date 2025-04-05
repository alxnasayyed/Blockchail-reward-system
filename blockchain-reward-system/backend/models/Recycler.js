const mongoose = require("mongoose");

const RecyclerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    walletAddress: { type: String, required: true },
});

module.exports = mongoose.model("Recycler", RecyclerSchema);
