const express = require('express');
const router = express.Router();
const User = require('../Models/userModel'); // Ensure the correct path to your model
const {registerUser, loginUser} = require('../Controllers/userController')

router.post('/register', registerUser);

router.post("/login", loginUser);

module.exports = router;