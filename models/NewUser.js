const mongoose = require("mongoose");

const NewUserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    secondname: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);
mongoose.models = {};

export default mongoose.model("NewUser", NewUserSchema);
