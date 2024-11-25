const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "please add your email"],
    },
    name: {
      type: String,
      require: [true, "please add your first name"],
    },
    age: {
      type: Number,
      require: [true, "please add your age"],
    },
    blood_group: {
      type: String,
      require: [true, "please add your bg"],
    },
    gender: {
      type: String,
      require: [true, "please add your gender"],
    },
    phone_number: {
      type: String,
      require: [true, "please add your phone no."],
    },
    password: {
      type: String,
      require: [true, "please add your pass"],
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
