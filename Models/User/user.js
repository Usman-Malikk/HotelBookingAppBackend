import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "minimum lenght of password should be 6"],
  },
  phone: {
    type: Number,
    required: true,
    minLength: 11,
  },
  isadmin: {
    type: Boolean,
    default: false,
  },
});

export default new mongoose.model("User", UserSchema);
