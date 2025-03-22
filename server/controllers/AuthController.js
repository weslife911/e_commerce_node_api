require("dotenv").config();

const { User, validateRegister, validateLogin } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async(req, res) => {
    try {
        
        const { error } = validateRegister(req.body);

        const { name, email, role, password } = req.body;

        if(error) res.json({
            success: false,
            message: error.details[0].message
        });

        const checkExistingUser = await User.findOne({ email: email });

        if(checkExistingUser) res.json({
            success: false,
            message: "User with the same email exists! Please try again with a different email."
        });

        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_ROUNDS));
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await new User({
            name: name,
            email: email,
            role: role || "customer",
            password: hashedPassword
        }).save();

        if(!newUser) return res.json({
            success: false,
            message: "User was not registered successfully"
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again"
        });
    }
};

const loginUser = async(req, res) => {
    try {

        const { error } = validateLogin(req.body);

        const { email, password } = req.body;

        if(error) return res.json({
            success: false,
            message: error.details[0].message
        });

        const checkExistingUser = await User.findOne({ email: email });

        if(!checkExistingUser) return res.json({
            success: false,
            message: "User with email doesn't exist! Please try again with different credentials."
        });

        const comparePassword = await bcrypt.compare(password, checkExistingUser.password);

        if(!comparePassword) return res.json({
            success: false,
            message: "Passwords do not match! Please try again with different credentials."
        });

        const token = jwt.sign({
            id: checkExistingUser._id,
        }, process.env.JWT_SECRET_KEY, {expiresIn: "5m"});

        res.status(201).json({
            success: true,
            message: "Logged In successfully!",
            token: token
        });

    } catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again."
        });
    }
};



const getAllUsers = async(req, res) => {
    try {

        const users = await User.find({ role: "customer" });

        if(!users) return res.json({
            success: false,
            message: "Users could not be found"
        });

        res.status(200).json(users);

    } catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again."
        });
    }
};

const getUser = async(req, res) => {
    try {

        const { id } = req.params;

        const user = await User.find({ _id: id });

        if(!user) return res.json({
            success: false,
            message: "User with given ID could not be found"
        });

        res.status(200).json(user);

    } catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again."
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUser,
};