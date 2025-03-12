const { getAllUsers, getUser } = require("../controllers/AuthController");
const { addCategory, getAllCategories, getCategory, updateCategory } = require("../controllers/CategoryController");
const { addProducts } = require("../controllers/ProductController");

const router = require("express").Router();

// Categories

router.post("/add_category", addCategory);
router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategory);
router.put("/category/update/:id", updateCategory);
router.delete("/category/delete/:id");

// Users

router.get("/users", getAllUsers);
router.get("/user/:id", getUser);



module.exports = router;