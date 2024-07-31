const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    phone: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
    },
    token: {
      type: String,
      default: "",
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);