const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userCompany: { type: String, required: true },
    userStatus: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPassword: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Users", UsersSchema);
