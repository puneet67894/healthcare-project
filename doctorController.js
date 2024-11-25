const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Doctor = require("../Models/doctorModel");
require("dotenv").config();

const registerDoctor = asyncHandler(async (req, res) => {
  const { email, name, phone_number, specialty, password } = req.body;

  if (!email || !name || !phone_number || !specialty || !password) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const doctorExists = await Doctor.findOne({ email });
  if (doctorExists) {
    return res.status(400).json({ message: "Doctor already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const doctor = await Doctor.create({
    email,
    name,
    phone_number,
    specialty,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "Doctor registered successfully",
    doctor,
  });
});

module.exports = { registerDoctor };
