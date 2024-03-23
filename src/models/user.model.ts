import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Please provide a unique username"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: [true, "Please provide a unique email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiration: Date,
  verifyToken: String,
  verifyTokenExpiration: Date,
});

const User = models.users || model("users", userSchema);

export default User;
