require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectToDB = require("./database/db");
const { registerUser, loginUser, getAllUsers, getUser } = require("./controllers/AuthController");
const { addCategory, getAllCategories, getCategory, updateCategory } = require("./controllers/CategoryController");
const { addProducts, getProducts, getProduct } = require("./controllers/ProductController");

const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Welcome to the E-commerce API");
});

// Users

app.post("/api/auth/register", registerUser);
app.post("/api/auth/login", loginUser);
app.get("/api/users", getAllUsers);
app.get("/api/user/:id", getUser);

// Categories

app.post("/api/add_category", addCategory);
app.get("/api/categories", getAllCategories);
app.get("/api/categories/:id", getCategory);
app.put("/api/category/update/:id", updateCategory);

// Products

app.post("/api/add_prooduct", addProducts);
app.get("/api/products", getProducts);
app.get("/api/product/:id", getProduct);

connectToDB();

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});