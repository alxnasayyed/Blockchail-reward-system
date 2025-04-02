const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enum: ["user", "admin", "recycler", "collector"],  // ✅ Fix: Add "collector"
});

module.exports = mongoose.model("User", UserSchema);
