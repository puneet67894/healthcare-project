const asyncHandler=require("express-async-handler");
const bcrypt=require("bcrypt");
const User=require("../Models/userModel");
require ("dotenv").config();

const registerUser=asyncHandler(async (req,res)=>{
    const {email,name,age,blood_group,gender,phone_number,password}=req.body;

    if(!email || !name || !age || !blood_group || !gender || !phone_number || !password){
        res.status(400);
        throw new Error("please provides all fields");
    }

    const userExists= await User.findOne({email});

    if(userExists){
        return res.status(400).json({message:"user already exists"});
    }

    const salt= await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    const user=await User.create({
        email,name,age,blood_group,gender,phone_number,
        password:hashedPassword,
    });

    res.status(201).json({message:"User registered successfully",user});
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: "Bad Authentication",
            message: "Fields are not fully filled"
        });
    }

    const userExists = await User.findOne({ email });
    if (!userExists) {
        return res.status(401).json({
            error: "Bad Authentication",
            message: "User doesn't exist"
        });
    }

    const isMatch = await bcrypt.compare(password, userExists.password);

    if (isMatch) {
        return res.status(200).json({
            message: "Login successful",
            user: {
                email: userExists.email,
                name: userExists.name
            }
        });
    } else {
        return res.status(401).json({
            error: "Bad Authentication",
            message: "Invalid credentials"
        });
    }
});

module.exports={registerUser,loginUser}