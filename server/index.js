require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectToDB = require("./database/db");
const UserRouter = require("./routes/user_routes");
const CategoryRouter = require("./routes/auth_routes");
const ProductRouter = require("./routes/productRouter");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", UserRouter);
app.use("/api", CategoryRouter);
app.use("/api", ProductRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the E-commerce API");
});

connectToDB();

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});