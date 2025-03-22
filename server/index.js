require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require('express-session');
const connectToDB = require("./database/db");
const { addCategory, getAllCategories, getCategory, updateCategory } = require("./controllers/CategoryController");
const { addProducts, getProducts, getProduct } = require("./controllers/ProductController");
const { registerUser, loginUser, getAllUsers, getUser } = require("./controllers/AuthController");
const authRoutes = require("./routes/AuthRoutes");
const adminRoutes = require("./routes/AdminRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const productRoutes = require("./routes/ProductRoutes");
const passport = require("passport");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
    session(
      { 
        secret: process.env.SESSION_SECRET, 
        resave: false, 
        saveUninitialized: false 
      }
    )
);
app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoutes); // User Routes
app.use("/api", adminRoutes); // Admin Routes
app.use("/api", categoryRoutes); // Category Routes
app.use("/api", productRoutes); // Product Routes

// Github Auth


connectToDB();

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});