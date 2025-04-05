const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["user", "admin", "recycler", "collector"],  // ✅ FIXED: Role should be inside an object
    required: true 
  }
});

module.exports = mongoose.model("User", UserSchema);
