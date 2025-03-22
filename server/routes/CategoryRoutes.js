const { addCategory, getAllCategories, getCategory, updateCategory } = require("../controllers/CategoryController");

const router = require("express").Router();

router.post("/api/add_category", addCategory);
router.get("/api/categories", getAllCategories);
router.get("/api/categories/:id", getCategory);
router.put("/api/category/update/:id", updateCategory);

module.exports = router;