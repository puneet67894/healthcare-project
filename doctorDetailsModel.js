const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add your email"],
    },
    name: {
      type: String,
      required: [true, "Please add your name"],
    },
    phone_number: {
      type: String,
      required: [true, "Please add your phone number"],
    },
    specialty: {
      type: String,
      required: [true, "Please add your specialty"],
    },
    password: {
      type: String,
      required: [true, "Please add your password"],
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;